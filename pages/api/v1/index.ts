import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res
		.status(200)
		.json({ success: "true", data: "Hello! Welcome to the 30 Seconds API!" });
};
