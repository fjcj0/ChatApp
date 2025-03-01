import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const protectRoute = async (request, response, next) => {
    try {
        const token = request.cookies.jwt;
        if (!token) {
            return response.status(401).json({ message: "Unauthorized - not token provided!!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return response.status(401).json({ message: "Unauthorized - not token provided!!" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return response.status(401).json({ message: "user not found!!!!" });
        }
        request.user = user;
        next();
    }
    catch (error) {
        console.log(error.message);
        return response.status(200).json({ error: error.message });
    }
};