import { Card, Item, CATEGORIES, DIFFICULTIES } from "../interfaces";

const cards: Card[] = [
	{
		id: uuidv4(),
		category: [CATEGORIES.cars],
		difficulty: [DIFFICULTIES.default],
		items: [],
		get noItems() {
			return (<any>this).items.length;
		},
	},
];

export default cards;
