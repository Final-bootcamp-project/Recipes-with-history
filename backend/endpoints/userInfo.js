//Endpoint to get the user's info
export const userInfo = async (req, res) => {
	const { userId } = req.params;
	// in order to return a document and not only an id we need to populate, it takes one argument with what property needs to be populated
	// under the hood populate performs another query, findById, looks through roles collection to find one particular role with that id
	const user = await User.findById(userId);
	res.status(201).json({ response: user, success: true });
};
