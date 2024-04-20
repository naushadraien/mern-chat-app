import ErrorHandler from "./utility-Class.js";
export const successData = (res, message, data, register) => {
    let jsonData = {
        success: true,
        message,
        data,
    };
    if (register) {
        return res.status(201).json(jsonData);
    }
    else {
        return res.status(200).json(jsonData);
    }
};
const getErrorMessageAccordingToStatus = (status, message) => {
    switch (status) {
        case 400:
            return message ? message : "Bad Request";
        case 401:
            return message ? message : "Unauthorized";
        case 403:
            return message ? message : "Forbidden";
        case 404:
            return message ? message : "Not Found";
        case 500:
            return message ? message : "Internal Server Error";
        default:
            return "An error occurred";
    }
};
export const errorMessage = (next, message, status) => {
    return next(new ErrorHandler(getErrorMessageAccordingToStatus(status, message), status));
};
