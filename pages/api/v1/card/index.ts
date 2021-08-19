import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import items from "../../../../data/items";
import { Card, CATEGORIES, DIFFICULTIES, Item } from "../../../../interfaces";
import { intersection } from "../../../../utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// Get items that match number of items and category.
	const getItems = (
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

	const getCard = (
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
	const {
		method,
		query: { category, noItemsPerCard, difficulty },
	} = req;

	switch (method) {
		case "GET":
			// Initialise query params and check if they exist
			let categoryParam = (category as string) ? category : "all";
			let noItemsPerCardParam = (noItemsPerCard as string)
				? Number.parseInt(noItemsPerCard as string)
				: 5;
			let difficultyParam = (difficulty as string) ? difficulty : "default";

			const finalCategoryParam: string[] =
				typeof categoryParam === "string" ? [categoryParam] : categoryParam;
			const finalDifficultyParam: string[] =
				typeof difficultyParam === "string"
					? [difficultyParam]
					: difficultyParam;

			const card: Card = getCard(
				noItemsPerCardParam,
				finalCategoryParam,
				finalDifficultyParam
			);

			res.status(200).json({
				success: "true",
				data: { card },
			});
			break;
		default:
			return res.status(400).json({ success: false });
	}
};
