import { randomUUID } from "crypto";

import { Card, Item, CATEGORY, DIFFICULTY } from "../interfaces";

const cards: Card[] = [
	{
		id: randomUUID(),
		categories: [CATEGORY.cars],
		difficulties: [DIFFICULTY.all],
		items: [],
		get noItems() {
			return (<any>this).items.length;
		},
	},
];

export default cards;
