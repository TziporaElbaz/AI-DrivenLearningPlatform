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
exports.default = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // Assuming User model is exported from this path
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // קודם כל ננסה לקרוא מהעוגיה
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        // אם אין בעוגיה, ננסה מה-Authorization header
        const authHeader = req.headers.authorization;
        const headerToken = authHeader ? authHeader.split(' ')[1] : null;
        const finalToken = token || headerToken;
        if (!finalToken)
            return res.status(401).json({ error: 'No token provided' });
        try {
            const decoded = jsonwebtoken_1.default.verify(finalToken, process.env.JWT_SECRET);
            const user = yield User_1.default.findByPk(decoded.id);
            if (!user)
                return res.status(401).json({ error: 'User not found' });
            req.user = user;
            next();
        }
        catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });
}
