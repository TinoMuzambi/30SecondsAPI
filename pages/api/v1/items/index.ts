import { NextApiRequest, NextApiResponse } from "next";

import Item from "../../../../models/Item";
import db from "../../../../utils/dbConnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	db();
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const careers: typeof Item[] = await Item.find({});

				res.status(200).json({ success: "true", data: careers });
			} catch (error) {
				res.status(400).json({ success: "false", data: error });
			}
			break;
		case "POST":
			try {
				const career: typeof Item = await Item.create(req.body);

				res.status(201).json({ success: "true", data: career });
			} catch (error) {
				res.status(400).json({ success: "false", data: error });
			}
			break;
		default:
			return res.status(400).json({ success: false });
	}
};
