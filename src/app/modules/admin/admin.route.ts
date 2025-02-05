import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { AdminController } from './admin.controller';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.ADMIN),
  AdminController.blockUser,
);

router.delete('/blogs/:id', auth(USER_ROLE.ADMIN), AdminController.deleteBlog);

export default router;
