module.exports = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/api/v1",
				permanent: true,
			},
		];
	},
};
