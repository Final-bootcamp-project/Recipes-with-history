import mongoose from 'mongoose';
import crypto from 'crypto';

//-------------- MONGOOSE SCHEMA FOR USER----------
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		unique: true,
		minlength: [5, 'You need at least 5 letters for your username'],
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'),
	},
});

export const User = mongoose.model('User', UserSchema);
