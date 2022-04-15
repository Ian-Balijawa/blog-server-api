import express, { Response, Request } from 'express';
import { NotFoundError } from '../../errors';
import { requireAuth } from '../../middlewares';
import { Blog } from '../../models';

const router = express.Router();

const version = process.env.API_VERSION!;

router.get(
	`/${version}/blogs`,
	requireAuth,
	async (req: Request, res: Response) => {
		const blogs = await Blog.find({ isApproved: true });

		if (!blogs) {
			throw new NotFoundError('No blogs found');
		}

		return res.status(200).json({ blogs });
	}
);

router.get(
	`/${version}/blogs/unapproved`,
	requireAuth,
	async (req: Request, res: Response) => {
		const blogs = await Blog.find({ isApproved: false });

		if (!blogs) {
			throw new NotFoundError('No unapproved blogs yet');
		}

		res.status(200).json({ blogs });
	}
);

router.get(
	`/${version}/blogs/news`,
	requireAuth,
	async (req: Request, res: Response) => {}
);

export { router as showBlogRouter };
