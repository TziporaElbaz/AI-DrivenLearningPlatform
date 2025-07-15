"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateRequest;
// ...המרה ל-TypeScript תתבצע כאן בהמשך...
function validateRequest(fields) {
    return (req, res, next) => {
        for (const field of fields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `Missing field: ${field}` });
            }
        }
        next();
    };
}
