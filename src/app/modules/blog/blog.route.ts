import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Public routes
router.get('/', BlogController.getAllBlogs);

// Protected routes
router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.USER),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.USER), BlogController.deleteBlog);

export default router;
