import { NextApiRequest, NextApiResponse } from "next";

import Item from "../../../../models/Item";
import db from "../../../../utils/dbConnect";

const res = async (req: NextApiRequest, res: NextApiResponse) => {
	db();
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const items: typeof Item[] = await Item.find({});

				res.status(200).json({ success: "true", data: items });
			} catch (error) {
				res.status(400).json({ success: "false", data: error });
			}
			break;
		case "POST":
			try {
				const item: typeof Item = await Item.create(req.body);

				res.status(201).json({ success: "true", data: item });
			} catch (error) {
				res.status(400).json({ success: "false", data: error });
			}
			break;
		case "PUT":
			try {
				const item: typeof Item = await Item.findByIdAndUpdate(
					req.body._id,
					req.body
				);

				res.status(201).json({ success: "true", data: item });
			} catch (error) {
				res.status(400).json({ success: "false", data: error });
			}
		default:
			return res.status(400).json({ success: false });
	}
};

export default res;
