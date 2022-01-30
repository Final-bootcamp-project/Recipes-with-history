import { User } from '../models/User.js'

import bcrypt from 'bcrypt'

export const signUp = async (req, res) => {
	const { name, email, username, password } = req.body;
	try {
		const salt = bcrypt.genSaltSync();
		console.log('hello');
		// a condition for creating a password
		if (password.length < 6 || username.length < 5) {
			console.log('user could not be created')
			//redirecting to catch
			throw 'Password must be at least 6 characters long and username must be longer than 5 characters';
		}
		const newUser = await new User({
			name,
			username,
			email,
			password: bcrypt.hashSync(password, salt),
		}).save();
		res.status(201).json({
			response: { 
				username: newUser.username, 
				userId: newUser._id 
			},
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			response: {
				error, 
				message: 'No user could be created' },
			success: false,
		})
	}
}
