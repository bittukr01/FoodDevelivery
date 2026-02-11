import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const headerToken = req.headers?.token;
    const authHeader = req.headers?.authorization;
    const bearerToken = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
        ? authHeader.slice("Bearer ".length)
        : undefined;

    const token = bearerToken || headerToken;

    if (!token) {
        return res.json({ success: false, message: "Unauthorized Access!" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id;
        req.body = req.body ?? {};
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Invalid Token!",
            error: error?.name ? `${error.name}: ${error.message}` : undefined,
        });
    }
};

export default authMiddleware;