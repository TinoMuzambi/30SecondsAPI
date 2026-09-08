import { timingSafeEqual } from "crypto";

import { CATEGORY, DIFFICULTY } from "../interfaces";

export class InvalidQueryError extends Error {}

type QueryValue = string | string[] | undefined;

const parseList = <T extends string>(
	value: QueryValue,
	allowedValues: readonly T[],
	fallback: T
): T[] => {
	const values = (Array.isArray(value) ? value : value?.split(","))
		?.map((entry) => entry.trim().toLowerCase())
		.filter(Boolean);

	if (!values || values.length === 0) return [fallback];
	if (values.some((entry) => !allowedValues.includes(entry as T))) {
		throw new InvalidQueryError(`Unsupported value: ${values.join(",")}`);
	}

	return Array.from(new Set(values)) as T[];
};

export const parseFilters = (query: {
	categories?: QueryValue;
	difficulties?: QueryValue;
	noItemsPerCard?: QueryValue;
}) => {
	const categories = parseList(
		query.categories,
		Object.values(CATEGORY),
		CATEGORY.all
	) as CATEGORY[];
	const difficulties = parseList(
		query.difficulties,
		Object.values(DIFFICULTY),
		DIFFICULTY.all
	) as DIFFICULTY[];
	const rawCount = Array.isArray(query.noItemsPerCard)
		? query.noItemsPerCard[0]
		: query.noItemsPerCard;
	const noItemsPerCard = rawCount === undefined ? 5 : Number(rawCount);

	if (!Number.isInteger(noItemsPerCard) || noItemsPerCard < 1 || noItemsPerCard > 10) {
		throw new InvalidQueryError("noItemsPerCard must be an integer from 1 to 10");
	}

	return { categories, difficulties, noItemsPerCard };
};

export const isWriteAuthorized = (
	authorizationHeader: string | undefined,
	configuredSecret = process.env.ITEMS_WRITE_SECRET
): boolean => {
	if (!configuredSecret || !authorizationHeader?.startsWith("Bearer ")) return false;

	const providedSecret = authorizationHeader.slice("Bearer ".length);
	const encoder = new TextEncoder();
	const providedBuffer = encoder.encode(providedSecret);
	const configuredBuffer = encoder.encode(configuredSecret);
	return (
		configuredBuffer.length >= 32 &&
		providedBuffer.length === configuredBuffer.length &&
		timingSafeEqual(providedBuffer, configuredBuffer)
	);
};
