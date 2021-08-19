import { Card, Item, CATEGORY, DIFFICULTY } from "../interfaces";

const cards: Card[] = [
	{
		id: uuidv4(),
		category: [CATEGORY.cars],
		difficulty: [DIFFICULTY.default],
		items: [],
		get noItems() {
			return (<any>this).items.length;
		},
	},
];

export default cards;
