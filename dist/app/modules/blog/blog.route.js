"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
// Public routes to get all blogs
router.get('/', blog_controller_1.BlogController.getAllBlogs);
// Protected routes to create blog
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.USER), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlogValidationSchema), blog_controller_1.BlogController.createBlog);
// Protected routes to update blog
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.USER), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlogValidationSchema), blog_controller_1.BlogController.updateBlog);
// Protected routes to delete blog
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.USER), blog_controller_1.BlogController.deleteBlog);
exports.default = router;
