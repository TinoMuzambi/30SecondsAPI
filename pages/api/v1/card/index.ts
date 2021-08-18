import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { category },
	} = req;

	switch (method) {
		case "GET":
			res.status(200).json({
				success: "true",
				data: { cat: category },
			});
			break;
		default:
			return res.status(400).json({ success: false });
	}
};
