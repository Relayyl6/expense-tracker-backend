export const errorMiddleware = (req, res, next, err) => {
    try {
        console.error(err);

        let statusCode = err.statusCode || 500;
        let message = err.message || "Server Error";

        

        res.status(statusCode).json({
            success: false,
            error: message,
        })
    } catch (middlewareError) {
        console.error("Error in errorMiddleware:", middlewareError);
        res.status(500).json({
            success: false,
            error: "Something went wrong in the error middleware handler",
        });
    }
}