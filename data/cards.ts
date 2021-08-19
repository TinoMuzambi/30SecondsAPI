import { v4 as uuidv4 } from "uuid";

import { Card, Item, CATEGORY, DIFFICULTY } from "../interfaces";

const cards: Card[] = [
	{
		id: uuidv4(),
		categories: [CATEGORY.cars],
		difficulties: [DIFFICULTY.standard],
		items: [],
		get noItems() {
			return (<any>this).items.length;
		},
	},
];

export default cards;
