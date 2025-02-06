"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../errors/AppError");
const user_model_1 = __importDefault(require("../user/user.model"));
const blog_model_1 = __importDefault(require("../blog/blog.model"));
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    // Check if user exists
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    // Check if user is already blocked
    if (user.isBlocked) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User is already blocked');
    }
    // Check if user is admin
    if (user.role === 'admin') {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, 'Admin cannot be blocked');
    }
    // check user is blocked or not
    yield user_model_1.default.findByIdAndUpdate(userId, { isBlocked: true });
});
const deleteBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(blogId);
    if (!blog) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    yield blog_model_1.default.findByIdAndDelete(blogId);
});
exports.AdminService = {
    blockUser,
    deleteBlog,
};
