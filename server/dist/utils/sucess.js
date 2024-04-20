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
