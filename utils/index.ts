import { v4 as uuidv4 } from "uuid";

import items from "../data/items";
import { Card, CATEGORIES, DIFFICULTIES, Item } from "../interfaces";

// Return true if there is an intersection, else false.
export const intersection = (array1: any[], array2: any[]): boolean => {
	return array1.filter((value) => array2.includes(value)) !== [];
};

// Get items that match number of items, difficulty and category.
export const getItems = (
	noItems: number,
	categories: CATEGORIES[],
	difficulty: DIFFICULTIES[]
): Item[] => {
	let cardItems: Item[] = [];

	while (cardItems.length < noItems) {
		const rand = Math.floor(Math.random() * items.length);
		const currItem = items[rand];
		if (
			intersection(categories, currItem.category) &&
			difficulty.includes(currItem.difficulty)
		) {
			cardItems.push(currItem);
		}
	}

	return cardItems;
};

// Get a card that matches number of items, difficulty and category.
export const getCard = (
	noItems: number,
	categories: CATEGORIES[],
	difficulty: DIFFICULTIES[]
): Card => {
	const cardItems = getItems(noItems, categories, difficulty);
	const card: Card = {
		id: uuidv4(),
		category: categories,
		difficulty: difficulty,
		items: cardItems,
		noItems: cardItems.length,
	};

	return card;
};
