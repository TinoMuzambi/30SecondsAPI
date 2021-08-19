import { NextApiRequest, NextApiResponse } from "next";

import { Card, CATEGORY, DIFFICULTY } from "../../../../interfaces";
import { getCard } from "../../../../utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { category, noItemsPerCard, difficulty },
	} = req;

	switch (method) {
		case "GET":
			// Initialise query params and check for undefined. If undefined, set to defaults.
			let categoryParam = (category as string) ? category : CATEGORY.all;
			let difficultyParam = (difficulty as string)
				? difficulty
				: DIFFICULTY.standard;
			let noItemsPerCardParam = (noItemsPerCard as string)
				? Number.parseInt(noItemsPerCard as string)
				: 5;

			// Check if params are already arrays, else convert to arrays with split.
			const finalCategoryParam: string[] =
				typeof categoryParam === "string"
					? categoryParam.split(",")
					: categoryParam;
			const finalDifficultyParam: string[] =
				typeof difficultyParam === "string"
					? difficultyParam.split(",")
					: difficultyParam;

			// Validation
			// Check that number of items per card isn't out of bounds.
			if (noItemsPerCardParam > 10) noItemsPerCardParam = 10;
			else if (noItemsPerCardParam < 1) noItemsPerCardParam = 5;

			// Generate card.
			const card: Card = getCard(
				noItemsPerCardParam,
				finalCategoryParam as CATEGORY[],
				finalDifficultyParam as DIFFICULTY[]
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
