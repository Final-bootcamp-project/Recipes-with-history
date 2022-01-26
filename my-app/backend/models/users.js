import mongoose from 'mongoose';
import crypto from 'crypto';

// Mongoose schema for user
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		unique: true,
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

const User = mongoose.model('User', UserSchema);

export default User;