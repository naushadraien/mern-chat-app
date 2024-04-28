export const errorMiddleware = (err, req, res, next) => {
    err.message || (err.message = "Internal server error");
    err.statusCode || (err.statusCode = 500);
    if (err.name === "CastError")
        err.message = "Invalid Id";
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
export const TryCatch = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    }
    catch (err) {
        next(err);
    }
};
