export const validatePost = (validationSchema) => async (req, res, next) => {
    console.log('test')
    try {
        await validationSchema.validate({
            body: req.body,
        });
        return next();
    } catch (err) {
        return res.status(500).json({ type: err.name, message: err.message });
    }
};

export default validatePost;