"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isAdmin;
// ...המרה ל-TypeScript תתבצע כאן בהמשך...
function isAdmin(req, res, next) {
    if (!req.user || req.user.is_admin !== true) {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
}
