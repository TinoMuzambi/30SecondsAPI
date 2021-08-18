import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { category, itemsPerCard, difficulty },
	} = req;

	switch (method) {
		case "GET":
			const categoryParam = category as string | "all";
			const itemsPerCardParam = Number.parseInt(itemsPerCard as string) | 5;
			const difficultyParam = difficulty as
				| ("easy" | "medium" | "hard")
				| "default";
			res.status(200).json({
				success: "true",
				data: { categoryParam, itemsPerCardParam, difficultyParam },
			});
			break;
		default:
			return res.status(400).json({ success: false });
	}
};
