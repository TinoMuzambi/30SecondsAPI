import { v4 as uuidv4 } from "uuid";

import { BASE_URL, Card, CATEGORY, DIFFICULTY, Item } from "../interfaces";

// Return true if item is already in list, else false.
export const isInList = (item: Item, items: Item[]): boolean => {
	let res = false;

	items.forEach((i) => {
		if (i.id === item.id) res = true;
	});

	return res;
};

// Get items from database.
export const getItemsFromDB = async (
	categories: CATEGORY[],
	difficulties: DIFFICULTY[]
): Promise<Item[]> => {
	const res = await fetch(
		`${BASE_URL}/api/v1/items?categories=${categories}&difficulties=${difficulties}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	const data = await res.json();

	return data.data;
};

// Get items that match number of items, difficulty and category.
export const getItems = async (
	noItems: number,
	categories: CATEGORY[],
	difficulties: DIFFICULTY[]
): Promise<Item[]> => {
	const items: Item[] = await getItemsFromDB(categories, difficulties);
	console.log({ items });
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

// Get a card that matches number of items, difficulty and category.
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
