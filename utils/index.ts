import { v4 as uuidv4 } from "uuid";

import items from "../data/items";
import { Card, CATEGORY, DIFFICULTY, Item } from "../interfaces";

// Return the intersection between two arrays.
export const intersection = (array1: any[], array2: any[]): any[] => {
	return array1.filter((value) => array2.includes(value));
};

// Get items that match number of items, difficulty and category.
export const getItems = (
	noItems: number,
	categories: CATEGORY[],
	difficulties: DIFFICULTY[]
): Item[] => {
	let cardItems: Item[] = [];

	const itemCategories = items.map((i) => i.categories.join(","));
	const itemDiffs: Item[] = items.filter((i) =>
		difficulties.includes(i.difficulty)
	);
	const itemDifficulties: string[] = itemDiffs.map((i) => i.difficulty);

	// First check if a list matching the requirements can be generated.
	if (
		(intersection(itemCategories, categories).length >= noItems ||
			categories[0] === CATEGORY.all) &&
		itemDifficulties.length >= noItems
	) {
		// While items less than requested number of items.
		while (cardItems.length < noItems) {
			const rand = Math.floor(Math.random() * items.length);
			const currItem = items[rand];

			// If item matches requiremenets, push it to the list.
			if (
				(intersection(categories, currItem.categories) !== [] ||
					categories[0] === CATEGORY.all) &&
				(difficulties.includes(currItem.difficulty) ||
					difficulties[0] === DIFFICULTY.all)
			) {
				cardItems.push(currItem);
			}
		}
	}

	return cardItems;
};

// Get a card that matches number of items, difficulty and category.
export const getCard = (
	noItems: number,
	categories: CATEGORY[],
	difficulties: DIFFICULTY[]
): Card => {
	// Get card items.
	const cardItems = getItems(noItems, categories, difficulties);

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
