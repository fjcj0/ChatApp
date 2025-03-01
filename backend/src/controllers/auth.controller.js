import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
export const signup = async (request, response) => {
    const { fullName, email, password } = request.body;
    try {
        if (!fullName || !email || !password) {
            return response.status(400).json({ message: "all fields are required!!" });
        }
        if (password.length < 6) {
            response.status(400).json({ message: "password must be at least 6 charcterz!!" })
        }
        const user = await User.findOne({ email });
        if (user) {
            return response.status(400).json({ message: "email is exist!!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });
        if (newUser) {
            generateToken(newUser._id, response);
            await newUser.save();
            return response.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }
        else {
            return response.status(400).json({ message: "User hasn't created unsuccessfully!!" });
        }
    } catch (error) {
        console.log(error.message);
        return response.status(400).json({ error: error.message });
    }
};

export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(400).json({ message: "Email or username maybe not correct!!" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return response.status(400).json({ message: "Email or username maybe not correct!!" });
        }
        generateToken(user._id, response);
        response.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(400).json({ error: error.message });
    }
};

export const logout = (request, response) => {
    try {
        response.cookie("jwt", "", { maxAge: 0 });
        response.status(200).json({ message: "User logged out successfully!!!" });
    } catch (error) {
        console.log(error.message);
        return response.status(200).json({ error: error.message });
    }
};