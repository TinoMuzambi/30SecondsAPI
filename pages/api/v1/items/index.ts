import { NextApiRequest, NextApiResponse } from "next";
import { CATEGORY, DIFFICULTY } from "../../../../interfaces";

import Item from "../../../../models/Item";
import db from "../../../../utils/dbConnect";

const res = async (req: NextApiRequest, res: NextApiResponse) => {
	db();
	const {
		method,
		query: { categories, difficulties },
	} = req;

	switch (method) {
		case "GET":
			try {
				const items: typeof Item[] =
					categories[0] === CATEGORY.all
						? difficulties[0] === DIFFICULTY.all
							? await Item.find({})
							: await Item.find({
									difficulty: { $in: difficulties },
							  })
						: difficulties[0] === DIFFICULTY.all
						? await Item.find({
								categories: { $in: categories },
						  })
						: await Item.find({
								categories: { $in: categories },
								difficulty: { $in: difficulties },
						  });

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
				const item: typeof Item = await Item.findOneAndUpdate(
					{ id: req.body.id },
					req.body
				);

				res.status(201).json({ success: "true", data: item });
			} catch (error) {
				res.status(400).json({ success: "false", data: error });
			}
			break;
		default:
			return res.status(400).json({ success: false });
	}
};

export default res;
