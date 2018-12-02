module.exports.handle_error = (error, req, res, next) => {
    console.info(`hit custom error handle`);

    console.error(`error: ${error.message}`);
    next(error);
};

module.exports.handle_unhandled_error = (reason, promise) => {

    console.debug('Unhandled Rejection at:', reason.stack || reason);
}