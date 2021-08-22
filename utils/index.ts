import { v4 as uuidv4 } from "uuid";

import { BASE_URL, Card, CATEGORY, DIFFICULTY, Item } from "../interfaces";

// Return the intersection between two arrays.
export const intersection = (array1: any[], array2: any[]): any[] => {
	let res: any[] = [];

	array1.forEach((val: any[]) => {
		for (let i = 0; i < val.length; i++) {
			for (let j = 0; j < array2.length; j++) {
				if (val[i] === array2[j]) res.push(val);
			}
		}
	});

	return res;
};

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
	console.log({ categories, difficulties });
	const items: Item[] = await getItemsFromDB(categories, difficulties);
	let cardItems: Item[] = [];

	// Generate lists to facilitate checking requirements.
	// List of all categories.
	const itemCategories = items?.map((i) => i.categories.join(",").split(","));

	// List of difficulties that match requirements.
	let itemDifficulties: string[];
	if (difficulties[0] === DIFFICULTY.all) {
		itemDifficulties = items.map((i) => i.difficulty);
	} else {
		const itemDiffs: Item[] = items.filter((i) =>
			difficulties.includes(i.difficulty)
		);
		itemDifficulties = itemDiffs.map((i) => i.difficulty);
	}

	// Convert categories into array in array format.
	let cat: any[] = [...categories];
	cat = cat.map((i) => i.split(","));

	// First check if a list matching the requirements can be generated.
	if (
		(intersection(itemCategories, categories).length >= noItems ||
			categories[0] === CATEGORY.all) &&
		(itemDifficulties.length >= noItems || difficulties[0] === DIFFICULTY.all)
	) {
		// While items less than requested number of items.
		while (cardItems.length < noItems) {
			const rand = Math.floor(Math.random() * items.length);
			const currItem = items[rand];

			// If item matches requiremenets, push it to the list.
			if (
				(intersection(cat, currItem.categories).length >= 1 ||
					categories[0] === CATEGORY.all) &&
				(difficulties.includes(currItem.difficulty) ||
					difficulties[0] === DIFFICULTY.all)
			) {
				// Only push if it's not already in the list.
				if (!isInList(currItem, cardItems)) {
					cardItems.push(currItem);
				}
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
