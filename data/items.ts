import { CATEGORIES, DIFFICULTIES, Item } from "../interfaces";

const items: Item[] = [
	{
		id: 1000,
		category: [CATEGORIES.cars],
		difficulty: DIFFICULTIES.default,
		content: "Maserati",
		clue: "Fork Logo",
	},
	{
		id: 1000,
		category: [CATEGORIES.cars],
		difficulty: DIFFICULTIES.default,
		content: "Ferrari",
		clue: "Red horse",
	},
	{
		id: 1000,
		category: [CATEGORIES.cars],
		difficulty: DIFFICULTIES.default,
		content: "Bugatti",
		clue: "Very fast",
	},
];

export default items;
