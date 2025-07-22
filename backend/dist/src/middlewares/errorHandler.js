"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.default = errorHandler;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
function errorHandler(err, req, res, next) {
    let error = Object.assign({}, err);
    error.message = err.message;
    console.error('🚨 Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        body: req.body,
        timestamp: new Date().toISOString()
    });
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message).join(', ');
        error = new AppError(message, 400);
    }
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `${field} already exists`;
        error = new AppError(message, 409);
    }
    if (err.name === 'CastError') {
        const message = `Invalid ${err.path}: ${err.value}`;
        error = new AppError(message, 400);
    }
    if (err.name === 'JsonWebTokenError') {
        error = new AppError('Invalid token', 401);
    }
    if (err.name === 'TokenExpiredError') {
        error = new AppError('Token expired', 401);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: Object.assign({ message: error.message || 'Internal Server Error' }, (process.env.NODE_ENV === 'development' && { stack: err.stack }))
    });
}
