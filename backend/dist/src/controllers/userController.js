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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllUsers = exports.handleGetUser = exports.handleLogout = exports.handleLogin = exports.handleRegister = void 0;
const userService_1 = require("../services/userService");
const asyncWrapper_1 = require("../middlewares/asyncWrapper");
const errorHandler_1 = require("../middlewares/errorHandler");
exports.handleRegister = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, phone } = req.query;
    if (!id || !name || !phone || typeof id !== 'string' || typeof name !== 'string' || typeof phone !== 'string') {
        throw new errorHandler_1.AppError('id, name, and phone are required in query string', 400);
    }
    const user = yield (0, userService_1.registerUser)({ id, name, phone });
    res.status(201).json({
        success: true,
        data: user
    });
}));
exports.handleLogin = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (!id || typeof id !== 'string') {
        throw new errorHandler_1.AppError('User ID is required in query string', 400);
    }
    const { user, token } = yield (0, userService_1.loginUser)({ id });
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
    res.json({
        success: true,
        data: { user, token }
    });
}));
exports.handleLogout = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
}));
exports.handleGetUser = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new errorHandler_1.AppError('Unauthorized - Authentication required', 401);
    }
    const user = yield (0, userService_1.getUserById)(req.user.id);
    if (!user) {
        throw new errorHandler_1.AppError('User not found', 404);
    }
    res.json({
        success: true,
        data: user
    });
}));
exports.handleGetAllUsers = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userService_1.getAllUsers)();
    res.json({
        success: true,
        data: users
    });
}));
