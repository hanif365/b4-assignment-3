import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Public routes to get all blogs
router.get('/', BlogController.getAllBlogs);

// Protected routes to create blog
router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

// Protected routes to update blog
router.patch(
  '/:id',
  auth(USER_ROLE.USER),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

// Protected routes to delete blog
router.delete('/:id', auth(USER_ROLE.USER), BlogController.deleteBlog);

export default router;
