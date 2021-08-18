import { v4 as uuidv4 } from "uuid";

import { CATEGORIES, DIFFICULTIES, Item } from "../interfaces";

const items: Item[] = [
	{
		id: uuidv4(),
		category: [CATEGORIES.cars],
		difficulty: DIFFICULTIES.default,
		content: "Maserati",
		clue: "Fork Logo",
	},
	{
		id: uuidv4(),
		category: [CATEGORIES.cars],
		difficulty: DIFFICULTIES.default,
		content: "Ferrari",
		clue: "Red horse",
	},
	{
		id: uuidv4(),
		category: [CATEGORIES.cars],
		difficulty: DIFFICULTIES.default,
		content: "Bugatti",
		clue: "Very fast",
	},
];

export default items;
