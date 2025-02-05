import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import { AppError } from '../../errors/AppError';
import { TBlog, TCreateBlog, TUpdateBlog } from './blog.interface';
import Blog from './blog.model';
import { USER_ROLE } from '../user/user.constant';
import QueryBuilder from '../../builder/QueryBuilder';
import { BLOG_SEARCHABLE_FIELDS } from './blog.constant';

const createBlog = async (
  payload: TCreateBlog,
  userId: Types.ObjectId,
): Promise<TBlog> => {
  const result = await (
    await Blog.create({
      ...payload,
      author: userId,
    })
  ).populate({ path: 'author', select: '-__v' });

  return result;
};

const updateBlog = async (
  id: string,
  payload: TUpdateBlog,
  userId: Types.ObjectId,
  role: string,
): Promise<TBlog | null> => {
  const blog = await Blog.findById(id);

  // Check if blog exists
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  // Check if user is admin or author of the blog
  if (
    role !== USER_ROLE.ADMIN &&
    blog.author.toString() !== userId.toString()
  ) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate({ path: 'author', select: '-__v' });

  return result;
};

const deleteBlog = async (
  id: string,
  userId: Types.ObjectId,
  role: string,
): Promise<void> => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (
    role !== USER_ROLE.ADMIN &&
    blog.author.toString() !== userId.toString()
  ) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }

  await Blog.findByIdAndDelete(id);
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate({ path: 'author', select: '-__v' }),
    query,
  );

  const result = await blogQuery
    .search(BLOG_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields()
    .execute();

  return result;
};

export const BlogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
