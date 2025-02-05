import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AdminService } from './admin.service';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  await AdminService.blockUser(req.params.userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  await AdminService.deleteBlog(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
};
