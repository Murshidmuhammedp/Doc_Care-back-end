import dotenv from 'dotenv';
import Jwt from 'jsonwebtoken'
dotenv.config();

export const adminLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = Jwt.sign({ email }, process.env.ADMIN_JWT_SECRET_KEY);

        return res.cookie('access_token', token, { httpOnly: true })
            .status(200).json({ message: "admin login successfully", token });

    } else {
        return res.status(404).json({ message: "Unauthorized" });
    }
};