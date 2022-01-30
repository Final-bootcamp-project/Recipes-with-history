import { User } from '../models/User.js';

export const signIn = async (req, res) => {
	const { username, password } = req.body; //object destructuring
	
  try {
		const user = await User.findOne({ username });
		if (user && bcrypt.compareSync(password, user.password)) {
			res.status(200).json({
				response: {
					userId: user._id,
					username: user.username,
					//accessToken: user.accessToken, //should we have this here??
				},
				success: true,
			});
		} else {
			res.status(404).json({
				response: 'User not found or password does not match',
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({
			response: error,
			success: false,
		});
	}
}