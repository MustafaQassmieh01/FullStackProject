export const handleMongooseError = (error, res) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: Object.values(error.errors).map(err => err.message)
        });
    } else if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: 'Duplicate key error',
            field: Object.keys(error.keyPattern)[0]
        });
    }
    
    console.error('Error:', error);
    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
};

