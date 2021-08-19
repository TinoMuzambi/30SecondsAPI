import mongoose, { Schema } from "mongoose";

import { CATEGORY, DIFFICULTY, Item } from "../interfaces";

const ItemSchema: Schema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: [true, "Item needs an ID."],
			trim: true,
			unique: [true, "Item ID needs to be unique."],
		},
		difficulty: {
			type: String,
			enum: DIFFICULTY,
			required: [true, "Item needs a difficulty"],
		},
		categories: {
			type: [String],
			enum: CATEGORY,
			required: [true, "Item needs at least one category."],
		},
		content: {
			type: String,
			required: [true, "Item needs content."],
			unique: [true, "Item content needs to be unique."],
		},
		clue: {
			type: String,
			required: [true, "Item needs a clue"],
		},
	},
	{
		timestamps: true,
		strict: true,
	}
);

export default mongoose.models.Item || mongoose.model<Item>("Item", ItemSchema);
