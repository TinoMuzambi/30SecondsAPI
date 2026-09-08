import { NextApiRequest, NextApiResponse } from "next";
import { CATEGORY, DIFFICULTY, Item as ItemType } from "../../../../interfaces";

import Item from "../../../../models/Item";
import db from "../../../../utils/dbConnect";
import { getItemsFromDB } from "../../../../utils";
import {
	InvalidQueryError,
	isWriteAuthorized,
	parseFilters,
} from "../../../../utils/request";

const res = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { categories, difficulties },
	} = req;

	switch (method) {
		case "GET":
			try {
				const filters = parseFilters({ categories, difficulties });
				const items = await getItemsFromDB(
					filters.categories,
					filters.difficulties
				);
				return res.status(200).json({ success: true, data: items });
			} catch (error) {
				if (error instanceof InvalidQueryError) {
					return res.status(400).json({ success: false, message: error.message });
				}
				return res.status(500).json({ success: false, message: "Unable to load items" });
			}
		case "POST":
		case "PUT":
			try {
				if (!isWriteAuthorized(req.headers.authorization)) {
					return res.status(403).json({
						success: false,
						message: "Item writes are disabled or unauthorized",
					});
				}

				const body = req.body as Partial<ItemType>;
				if (
					typeof body.id !== "string" ||
					typeof body.content !== "string" ||
					typeof body.clue !== "string" ||
					!Object.values(DIFFICULTY).includes(body.difficulty as DIFFICULTY) ||
					body.difficulty === DIFFICULTY.all ||
					!Array.isArray(body.categories) ||
					body.categories.length === 0 ||
					body.categories.some(
						(category) =>
							category === CATEGORY.all ||
							!Object.values(CATEGORY).includes(category as CATEGORY)
					)
				) {
					return res.status(400).json({ success: false, message: "Invalid item" });
				}

				await db();
				const item =
					method === "POST"
						? await Item.create(body)
						: await Item.findOneAndUpdate({ id: body.id }, body, {
								new: true,
								runValidators: true,
						  });

				if (!item) {
					return res
						.status(404)
						.json({ success: false, message: "Item not found" });
				}

				return res.status(method === "POST" ? 201 : 200).json({ success: true, data: item });
			} catch (error) {
				return res.status(400).json({ success: false, message: "Unable to save item" });
			}
		default:
			res.setHeader("Allow", "GET, POST, PUT");
			return res.status(405).json({ success: false });
	}
};

export default res;
