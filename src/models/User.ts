import mongoose from 'mongoose';
import { PasswordManager } from './../services';
import jwt from 'jsonwebtoken';

interface UserAttrs {
	email: string;
	password: string;
}

declare type ReturnDocument = {
	id?: string;
	_id?: string;
	password?: string;
	__v?: string;
};

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
	generateAuthenticationToken(user: UserDoc): string;
}

interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc: any, ret: ReturnDocument) {
				ret.id = ret._id;
				delete ret._id, delete ret.password, delete ret.__v;
			},
		},
	}
);

// Operation perfomed just before the document is saved to the database,
//If the password property if the user was modified.We need to rehash the password;
userSchema.pre('save', async function (done) {
	if (this.isModified('passsword')) {
		const hashed = await PasswordManager.toHash(this.get('password'));
		this.set('password', hashed);
	}

	done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

userSchema.statics.generateAuthenticationToken = (user: UserDoc) => {
	const userJwt = jwt.sign(
		{
			id: user.get('id'),
			email: user.get('email'),
		},
		process.env.JWT_KEY!
	);
	return userJwt;
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, userSchema };
