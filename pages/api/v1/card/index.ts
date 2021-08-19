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
			// Initialise query params and check if they exist
			let categoryParam = (category as string) ? category : CATEGORY.all;
			let difficultyParam = (difficulty as string)
				? difficulty
				: DIFFICULTY.standard;
			let noItemsPerCardParam = (noItemsPerCard as string)
				? Number.parseInt(noItemsPerCard as string)
				: 5;

			const finalCategoryParam: string[] =
				typeof categoryParam === "string"
					? categoryParam.split(",")
					: categoryParam;
			const finalDifficultyParam: string[] =
				typeof difficultyParam === "string"
					? difficultyParam.split(",")
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
