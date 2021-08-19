import { v4 as uuidv4 } from "uuid";

import { CATEGORY, DIFFICULTY, Item } from "../interfaces";

const items: Item[] = [
	{
		id: uuidv4(),
		_id: uuidv4(),
		categories: [CATEGORY.cars],
		difficulty: DIFFICULTY.medium,
		content: "Maserati",
		clue: "Fork Logo",
	},
	{
		id: uuidv4(),
		_id: uuidv4(),
		categories: [CATEGORY.cars],
		difficulty: DIFFICULTY.hard,
		content: "Ferrari",
		clue: "Red horse",
	},
	{
		id: uuidv4(),
		_id: uuidv4(),
		categories: [CATEGORY.cars],
		difficulty: DIFFICULTY.medium,
		content: "Bugatti",
		clue: "Very fast",
	},
	{
		id: uuidv4(),
		_id: uuidv4(),
		categories: [CATEGORY.cars],
		difficulty: DIFFICULTY.easy,
		content: "Lamborghini",
		clue: "Very fast and yellow.",
	},
];

export default items;
