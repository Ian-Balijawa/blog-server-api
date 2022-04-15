import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '../../middlewares';
import { Blog } from '../../models';

const router = express.Router();

const version = process.env.API_VERSION!;
router.post(
	`/${version}/blogs/new`,
	requireAuth,
	[
		body('title')
			.trim()
			.isLength({ max: 255 })
			.withMessage('Title is required'),
		body('author').exists().trim().isLength({ max: 255 }),
		body('content').exists().trim(),
		body('date').isDate().trim().withMessage('date must be provided'),
		body('authorId')
			.exists()
			.trim()
			.withMessage('authorId must be provided'),
		body('slug').isSlug().trim().withMessage('slug must be provided'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const blog = Blog.build({
			author: req.body.author,
			authorId: req.body.authorId,
			avatar: req.body.avatar,
			bannerUrl: req.body.bannerUrl,
			content: req.body.content,
			date: req.body.date,
			isApproved: req.body.isApproved,
			slug: req.body.slug,
			subTitle: req.body.subTitle,
			title: req.body.title,
		});

		try {
			await blog.save();
			return res.redirect('/blogs', 301);
		} catch (error) {
			return res.status(500).json({ error: 'Error saving your blog' });
		}
	}
);

export { router as newBlogRouter };
