/* The code exports two functions, get404 and get500, which are used to handle errors in an Express.js application.
get404 is a middleware function that is called when a request is made to a route that does not exist. It creates a new Error object with a message "Not Found 404" and sets its status to 404. Then it passes the error object to the next middleware function by calling next(error).
get500 is also a middleware function that is called when an error occurs in any other middleware function or route handler. It takes the error object as the first parameter and sets the response status code to the error's status if it exists, otherwise it sets it to 500. It then sends a JSON response with an error object that contains the error message.
These middleware functions can be used by adding them to the application's middleware stack using app.use(get404) and app.use(get500).
25/02/2023 Indika Sirimanna */

exports.get404 = (req, res, next) => {
    const error = new Error('Not Found 404');
    error.status = 404;
    next(error);
};

exports.get500 = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message,
        },
    });
};

