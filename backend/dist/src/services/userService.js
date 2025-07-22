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
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function registerUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, name, phone }) {
        return User_1.default.create({ id, name, phone });
    });
}
function loginUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id }) {
        const user = yield User_1.default.findByPk(id);
        if (!user)
            throw new Error('User not found');
        const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return { user, token };
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return User_1.default.findByPk(id);
    });
}
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return User_1.default.findAll();
    });
}
