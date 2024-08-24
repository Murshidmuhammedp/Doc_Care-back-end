import Jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const doctorToken = (req, res, next) => {
    try {

        const token = req.header["authorization"];

        if (!token) {
            res.status(403).json({ message: "Token is not provided" });
        }

        Jwt.verify(token, process.env.DOCTOR_JWT_SECRET_KEY, (error, decode) => {
            if (error) {
                res.status(401).json({ message: "Unauthorized" });
            }
            req.email = decode.email;
            next();
        });

    } catch (error) {
        return next(error);
        console.log(error);
    }
};