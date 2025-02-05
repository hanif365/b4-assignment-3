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
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = __importDefault(require("../user/user.model"));
const auth_utils_1 = require("./auth.utils");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user already exists
    const isUserExist = yield user_model_1.default.findOne({ email: payload.email });
    if (isUserExist) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, 'User already exists');
    }
    // Create user
    const user = yield user_model_1.default.create(payload);
    // Return user without password field for security reasons
    const responseData = {
        _id: user._id,
        name: user.name,
        email: user.email,
    };
    return responseData;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // Check if user exists
    const user = yield user_model_1.default.findOne({ email }).select('+password');
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist');
    }
    // Check if user is blocked
    if (user.isBlocked) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, 'Your account has been blocked');
    }
    // Check password is correct or not
    const isPasswordMatched = yield user_model_1.default.isPasswordMatched(password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }
    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };
    // Generate token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    // here we return access token as token
    return {
        token: accessToken,
    };
});
exports.AuthService = {
    registerUser,
    loginUser,
};
