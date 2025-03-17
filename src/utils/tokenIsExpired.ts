export default (token: string): boolean => {
	try {
		return (
			JSON.parse(Buffer.from(token.split('.')[1] ?? '', 'base64').toString())
				.exp *
				1000 <=
			new Date().getTime()
		);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (err) {
		return true;
	}
};
