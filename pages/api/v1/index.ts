import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case "GET":
			res.status(200).json({
				success: "true",
				data: "Hello! Welcome to the 30 Seconds API!",
			});
			break;
		default:
			return res.status(400).json({ success: false });
	}
};
