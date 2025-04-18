const errorMiddleware = (error, req, res, next) => {

    error.message ||="Internal Server Error"
    error.statusCode||=500
    return res.status(error.statusCode).json({success:false,message:error.message})
}

export {errorMiddleware}