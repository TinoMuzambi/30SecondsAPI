import { CATEGORIES, DIFFICULTIES, Item } from "../interfaces";

const items: Item[] = [
	{
		id: 1000,
		category: [CATEGORIES.cars],
		difficulty: DIFFICULTIES.default,
		content: "Maserati",
		clue: "Fork Logo",
	},
];

export default items;
