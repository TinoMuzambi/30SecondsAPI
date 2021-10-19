import { NextApiRequest, NextApiResponse } from "next";

import { Card, CATEGORY, DIFFICULTY } from "../../../../interfaces";
import { getCard } from "../../../../utils";

const res = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { categories, noItemsPerCard, difficulties },
	} = req;

	switch (method) {
		case "GET":
			// Initialise query params and check for undefined. If undefined, set to defaults.
			let categoryParam = (categories as string) ? categories : CATEGORY.all;
			let difficultyParam = (difficulties as string)
				? difficulties
				: DIFFICULTY.all;
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
			const card: Card = await getCard(
				noItemsPerCardParam,
				finalCategoryParam as CATEGORY[],
				finalDifficultyParam as DIFFICULTY[]
			);

			if (card.items.length === 0) {
				return res
					.status(500)
					.json({ success: false, message: "Please try again" });
			}

			res.status(200).json({
				success: true,
				data: { card },
			});
			break;
		default:
			return res.status(400).json({ success: false });
	}
};

export default res;
