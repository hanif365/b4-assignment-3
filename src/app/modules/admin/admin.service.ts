import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';
import User from '../user/user.model';
import Blog from '../blog/blog.model';

const blockUser = async (userId: string): Promise<void> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is already blocked');
  }

  if (user.role === 'admin') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Admin cannot be blocked');
  }

  await User.findByIdAndUpdate(userId, { isBlocked: true });
};

const deleteBlog = async (blogId: string): Promise<void> => {
  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  await Blog.findByIdAndDelete(blogId);
};

export const AdminService = {
  blockUser,
  deleteBlog,
};
