import assert from "node:assert/strict";
import test from "node:test";

import { CATEGORY, DIFFICULTY } from "../interfaces";
import fallbackItems from "../data/items";
import { filterItems } from "../utils";
import { isWriteAuthorized, parseFilters } from "../utils/request";

test("parseFilters supplies safe defaults", () => {
	assert.deepEqual(parseFilters({}), {
		categories: [CATEGORY.all],
		difficulties: [DIFFICULTY.all],
		noItemsPerCard: 5,
	});
});

test("parseFilters accepts comma-separated values", () => {
	assert.deepEqual(
		parseFilters({ categories: "cars,tech", difficulties: "easy", noItemsPerCard: "3" }),
		{
			categories: [CATEGORY.cars, CATEGORY.tech],
			difficulties: [DIFFICULTY.easy],
			noItemsPerCard: 3,
		}
	);
});

test("parseFilters rejects invalid values and counts", () => {
	assert.throws(() => parseFilters({ categories: "unknown" }), /Unsupported value/);
	assert.throws(() => parseFilters({ noItemsPerCard: "3.5" }), /integer/);
	assert.throws(() => parseFilters({ noItemsPerCard: "11" }), /integer/);
});

test("writes are disabled by default and require an exact bearer secret", () => {
	assert.equal(isWriteAuthorized("Bearer secret", undefined), false);
	assert.equal(isWriteAuthorized("Bearer wrong", "secret"), false);
	assert.equal(isWriteAuthorized("secret", "secret"), false);
	assert.equal(isWriteAuthorized("Bearer secret", "secret"), true);
});

test("the bundled catalogue applies category and difficulty filters", () => {
	const items = filterItems(
		fallbackItems,
		[CATEGORY.tech],
		[DIFFICULTY.medium]
	);

	assert.equal(items.length, 1);
	assert.equal(items[0].content, "Linux");
});
