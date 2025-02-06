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
exports.BlogService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../errors/AppError");
const blog_model_1 = __importDefault(require("./blog.model"));
const user_constant_1 = require("../user/user.constant");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_constant_1 = require("./blog.constant");
const createBlog = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (yield blog_model_1.default.create(Object.assign(Object.assign({}, payload), { author: userId }))).populate({ path: 'author', select: '-__v' });
    return result;
});
const updateBlog = (id, payload, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(id);
    // Check if blog exists
    if (!blog) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    // Check if user is admin or author of the blog
    if (role !== user_constant_1.USER_ROLE.ADMIN &&
        blog.author.toString() !== userId.toString()) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized to update this blog');
    }
    const result = yield blog_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    }).populate({ path: 'author', select: '-__v' });
    return result;
});
const deleteBlog = (id, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findById(id);
    if (!blog) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    if (role !== user_constant_1.USER_ROLE.ADMIN &&
        blog.author.toString() !== userId.toString()) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized to delete this blog');
    }
    yield blog_model_1.default.findByIdAndDelete(id);
});
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.default.find().populate({ path: 'author', select: '-__v' }), query);
    const result = yield blogQuery
        .search(blog_constant_1.BLOG_SEARCHABLE_FIELDS)
        .filter()
        .sort()
        .paginate()
        .fields()
        .execute();
    return result;
});
exports.BlogService = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
};
