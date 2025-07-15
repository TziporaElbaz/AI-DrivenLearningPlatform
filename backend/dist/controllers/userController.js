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
exports.handleRegister = handleRegister;
exports.handleLogin = handleLogin;
exports.handleGetUser = handleGetUser;
exports.handleGetAllUsers = handleGetAllUsers;
const userService_1 = require("../services/userService");
function handleRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, name, phone } = req.body;
            const user = yield (0, userService_1.registerUser)({ id, name, phone });
            res.status(201).json(user);
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
}
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { phone } = req.body;
            const { user, token } = yield (0, userService_1.loginUser)({ phone });
            // שמירת הטוקן ב-cookie
            res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
            res.json({ user, token });
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    });
}
function handleGetUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userService_1.getUserById)(req.user.id);
            if (!user)
                return res.status(404).json({ error: 'User not found' });
            res.json(user);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function handleGetAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userService_1.getAllUsers)();
            res.json(users);
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
