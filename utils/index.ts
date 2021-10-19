import { v4 as uuidv4 } from "uuid";
import originalFetch from "isomorphic-fetch";
import fetchRetry from "fetch-retry";

import { BASE_URL, Card, CATEGORY, DIFFICULTY, Item } from "../interfaces";

const fetch = fetchRetry(originalFetch);

/**
 * Determine whehter one item is already in the list or not.
 * @param {Item} item Item being checked for.
 * @param {Item[]} items List of items to check from
 * @returns {boolean} True if item is already in list, else false.
 */
export const isInList = (item: Item, items: Item[]): boolean => {
	let res = false;

	items.forEach((i) => {
		if (i.id === item.id) res = true;
	});

	return res;
};

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
	const res = await fetch(
		`${BASE_URL}/api/v1/items?categories=${categories}&difficulties=${difficulties}`,
		{
			retryOn: [400, 500, 404],
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	const data = await res.json();

	return data.data;
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
	({ items });
	let cardItems: Item[] = [];

	// First check if a list matching the requirements can be generated.
	if (items.length >= noItems) {
		// While items less than requested number of items.
		while (cardItems.length < noItems) {
			const rand = Math.floor(Math.random() * items.length);
			const currItem = items[rand];

			// Only push if it's not already in the list.
			if (!isInList(currItem, cardItems)) {
				cardItems.push(currItem);
			}
		}
	}

	return cardItems;
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
		id: uuidv4(),
		categories: categories,
		difficulties: difficulties,
		items: cardItems,
		noItems: cardItems.length,
	};

	return card;
};
