import { NextApiRequest, NextApiResponse } from "next";

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
			console.log(noItemsPerCard);
			console.log(noItemsPerCardParam);
			res.status(200).json({
				success: "true",
				data: { categoryParam, noItemsPerCardParam, difficultyParam },
			});
			break;
		default:
			return res.status(400).json({ success: false });
	}
};
