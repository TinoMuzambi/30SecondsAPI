import { NextApiRequest, NextApiResponse } from "next";

import { Card } from "../../../../interfaces";
import { getCard } from "../../../../utils";
import { InvalidQueryError, parseFilters } from "../../../../utils/request";

const res = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { categories, noItemsPerCard, difficulties },
	} = req;

	switch (method) {
		case "GET":
			try {
				const filters = parseFilters({ categories, difficulties, noItemsPerCard });
				const card: Card = await getCard(
					filters.noItemsPerCard,
					filters.categories,
					filters.difficulties
				);

				if (card.items.length < filters.noItemsPerCard) {
					return res.status(422).json({
						success: false,
						message: `Only ${card.items.length} matching items are available`,
					});
				}

				return res.status(200).json({ success: true, data: { card } });
			} catch (error) {
				if (error instanceof InvalidQueryError) {
					return res.status(400).json({ success: false, message: error.message });
				}
				console.error(error);
				return res.status(500).json({ success: false, message: "Unable to build card" });
			}
		default:
			res.setHeader("Allow", "GET");
			return res.status(405).json({ success: false });
	}
};

export default res;
