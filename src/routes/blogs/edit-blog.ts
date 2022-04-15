import express, { Response, Request } from 'express';
import { BadRequestError, NotFoundError } from '../../errors';
import { requireAuth, validateRequest } from '../../middlewares';
import { Blog } from '../../models';

const router = express.Router();

const version = process.env.API_VERSION;

router.patch(
	`/${version}/blogs/:author/:blogId`,
	requireAuth,
	async (req: Request, res: Response) => {
		const editedBlog = await Blog.findOne(
			{
				_id: req.params.blogId,
				author: req.params.author,
			},
			{
				$set: {
					bannerUrl: req.body.bannerUrl,
					title: req.body.title,
					content: req.body.content,
				},
			},
			{ new: true }
		);

		if (!editedBlog) {
			throw new NotFoundError(
				'Specified blog with Given parameters doesnot exist'
			);
		}

		return res.status(200).json({ editedBlog });
	}
);

router.patch(
	`/${version}/blogs/:blogId`,
	async (req: Request, res: Response) => {
		const blogToBeApprovedBlog = await Blog.updateOne(
			{
				_id: req.params.blogId,
			},
			{
				$set: {
					isApproved: req.body.isApproved
						? req.body.isApproved
						: false,
				},
			},
			{ new: true }
		);

		if (!blogToBeApprovedBlog) {
			throw new BadRequestError('Error appriving a non existing blog');
		}

		return res.status(200).json({ blogToBeApprovedBlog });
	}
);

export { router as editBlogRouter };
