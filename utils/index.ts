import { randomUUID } from "crypto";

import { Card, CATEGORY, DIFFICULTY, Item } from "../interfaces";
import fallbackItems from "../data/items";
import ItemModel from "../models/Item";
import dbConnect from "./dbConnect";

/**
 * Get all items from database with the given criteria.
 * @param {CATEGORY[]} categories Restrict items to a certain category/categories.
 * @param {DIFFICULTY[]} difficulties Restrict items to a certain difficulty/difficulties.
 * @returns {Item[]} A list of all items in the database that match the given criteria.
 */
export const getItemsFromDB = async (
	categories: CATEGORY[],
	difficulties: DIFFICULTY[]
): Promise<Item[]> => {
	const query = {
		...(categories.includes(CATEGORY.all)
			? {}
			: { categories: { $in: categories } }),
		...(difficulties.includes(DIFFICULTY.all)
			? {}
			: { difficulty: { $in: difficulties } }),
	};

	try {
		await dbConnect();
		const items = await ItemModel.find(query).lean();
		if (items.length > 0) return items as Item[];
	} catch (error) {
		console.error("Database unavailable; using the bundled card catalogue", error);
	}

	return filterItems(fallbackItems, categories, difficulties);
};

export const filterItems = (
	items: Item[],
	categories: CATEGORY[],
	difficulties: DIFFICULTY[]
): Item[] => {
	const allCategories = categories.includes(CATEGORY.all);
	const allDifficulties = difficulties.includes(DIFFICULTY.all);

	return items.filter(
		(item) =>
			(allCategories || item.categories.some((category) => categories.includes(category))) &&
			(allDifficulties || difficulties.includes(item.difficulty))
	);
};

/**
 * Gets items that match number of items, difficulty and category.
 * @param {number} noItems Number of items per card.
 * @param {CATEGORY[]} categories Restrict items to a certain category/categories.
 * @param {DIFFICULTY[]} difficulties Restrict items to a certain difficulty.
 * @returns {Item[]} A list of limited items matching the criteria.
 */
export const getItems = async (
	noItems: number,
	categories: CATEGORY[],
	difficulties: DIFFICULTY[]
): Promise<Item[]> => {
	const items: Item[] = await getItemsFromDB(categories, difficulties);
	const shuffled = [...items];

	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[shuffled[index], shuffled[randomIndex]] = [
			shuffled[randomIndex],
			shuffled[index],
		];
	}

	return shuffled.slice(0, noItems);
};

/**
 * Gets a card that matches number of items, difficulty and category.
 * @param {number} noItems Number of items per card.
 * @param {CATEGORY[]} categories Restrict items to a certain category/categories.
 * @param {DIFFICULTY[]} difficulties Restrict items to a certain difficulty.
 * @returns {Card} A card with the number of items, difficulty and category given.
 */
export const getCard = async (
	noItems: number,
	categories: CATEGORY[],
	difficulties: DIFFICULTY[]
): Promise<Card> => {
	// Get card items.
	const cardItems = await getItems(noItems, categories, difficulties);

	// Generate card.
	const card: Card = {
		id: randomUUID(),
		categories: categories,
		difficulties: difficulties,
		items: cardItems,
		noItems: cardItems.length,
	};

	return card;
};
