import mongoose from 'mongoose';
import slugify from 'slugify';

interface BlogAttrs {
	title: string;
	bannerUrl: string;
	subTitle: string;
	author: string; //for now but later it will be a user ref document
	content: string;
	date: Date;
	avatar: string;
	authorId: string;
	isApproved: boolean;
	slug: string;
}

interface BlogModel extends mongoose.Model<BlogDoc> {
	build(attrs: BlogAttrs): BlogDoc;
}

interface BlogDoc extends mongoose.Document {
	title: string;
	bannerUrl: string;
	subTitle: string;
	author: string; //for now but later it will be a user ref document
	content: string;
	date: Date;
	avatar: string;
	authorId: string;
	isApproved: boolean;
	slug: string;
}

declare type ReturnDocument = {
	id?: string;
	_id?: string;
	__v?: string;
};

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			max: 256,
			min: 5,
		},
		bannerURL: {
			type: String,
			required: false,
		},
		subtitle: {
			type: String,
			min: 3,
			max: 1024,
		},
		author: {
			type: String,
		},
		content: {
			type: String,
			min: 10,
			max: 3048,
		},
		date: {
			type: String,
		},
		avatar: {
			type: String,
		},
		authorID: {
			type: String,
		},
		isApproved: {
			type: Boolean,
			default: false,
		},
		slug: {
			type: String,
			unique: true,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc: any, ret: ReturnDocument) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

blogSchema.statics.build = (attrs: BlogAttrs) => {
	return new Blog(attrs);
};

const Blog = mongoose.model<BlogDoc, BlogModel>('Blog', blogSchema);

export { Blog, blogSchema };
