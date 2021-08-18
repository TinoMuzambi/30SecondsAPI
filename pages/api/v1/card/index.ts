import { NextApiRequest, NextApiResponse } from "next";
import cards from "../../../../data/cards";
import { Card } from "../../../../interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { category, noItemsPerCard, difficulty },
	} = req;

	switch (method) {
		case "GET":
			// Initialise query params and check if they exist
			const categoryParam = (category as string) ? category : "all";
			const noItemsPerCardParam = (noItemsPerCard as string)
				? Number.parseInt(noItemsPerCard as string)
				: 5;
			const difficultyParam = (difficulty as string) ? difficulty : "default";

			const cardsData: Card[] = [...cards];

			res.status(200).json({
				success: "true",
				data: { cardsData },
			});
			break;
		default:
			return res.status(400).json({ success: false });
	}
};
