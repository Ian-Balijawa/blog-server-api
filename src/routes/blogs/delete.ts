import express, { Response, Request } from 'express';
import { requireAuth, validateRequest } from '../../middlewares';
import { Blog } from '../../models';

const router = express.Router();

const version = process.env.API_VERSION!;

router.delete(
	`/${version}/blogs/:blogId`,
	requireAuth,
	async (req: Request, res: Response) => {
		const { blogId } = req.params;
		try {
			const deleledBlog = await Blog.deleteOne({
				_id: blogId,
			});
			return res.redirect('/blogs');
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
);

export { router as deleteBlogRouter };
