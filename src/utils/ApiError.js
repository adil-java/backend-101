class ApiError extends Error {
    constructor(statusCode, message="Internal Server Error",error=[],stack="") {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.stack = stack;
        this.data = null;
        this.success = false;
        this.message = message;
        this.errors=error;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export {ApiError};
