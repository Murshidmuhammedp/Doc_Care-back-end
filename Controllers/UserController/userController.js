import Users from "../../Models/userSchema.js";
import bcrypt from 'bcrypt'
import userjoi from "../../joiValidation/userValidation.js";
import Jwt from "jsonwebtoken";
import createError from "http-errors"

export const signup = async (req, res, next) => {

    const { value, error } = userjoi.validate(req.body);

    if (error) {
        return res.status(400).json({ Details: error });
    }

    const { username, phone_number, email, password } = value;


    const existingUser = await Users.findOne({ email });

    if (existingUser) {
        return res.status(200).json({ message: "E-mail already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
        username,
        phone_number,
        email,
        password: hashedPassword
    });
    await newUser.save();

    return res.status(201).json({ message: "Registered successfully", data: newUser });
}

export const signin = async (req, res, next) => {

    const { email, password } = req.body;

    const validUser = await Users.findOne({ email });

    if (!validUser) {
        return res.status(404).json({ message: "User not found" });
    };

    if (validUser.isDeleted == true) {
        // throw new createError[400]("Your account is suspended")
        return res.status(400).json({ message: "Your account is suspended" });
    };

    const validpassword = bcrypt.compareSync(password, validUser.password);
    if (!validpassword) {
        // throw new createError.BadRequest("Password incorrect");
       return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = Jwt.sign({ id: validUser._id }, process.env.USER_JWT_SECRET_KEY);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 60 * 1000);
    // cookie setting 
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate });
    res.status(200).json({ message: "successfully login", token, data: rest });
};

