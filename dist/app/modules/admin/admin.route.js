"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
// Protected routes to block user
router.patch('/users/:userId/block', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), admin_controller_1.AdminController.blockUser);
// Protected routes to delete blog
router.delete('/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), admin_controller_1.AdminController.deleteBlog);
exports.default = router;
