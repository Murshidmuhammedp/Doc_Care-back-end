import doctors from "../../Models/doctorSchema.js";
import doctorjoi from "../../joiValidation/doctorValidation.js";
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken'

export const doctorRegistration = async (req, res) => {

    const { value, error } = doctorjoi.validate(req.body);

    if (error) {
        return res.status(404).json({ Details: error });
    }

    const { doctor_ID, full_Name, email, phone_Number, gender, DOB, specialization, experience, consultation_Fee, consultation_Address, district, state, pincode, startTime, endTime, password } = value

    const existingdoctor = await doctors.findOne({ doctor_ID })

    if (existingdoctor) {
        return res.status(200).json({ message: "Already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new doctors({
        doctor_ID,
        full_Name,
        email,
        phone_Number,
        gender,
        DOB,
        specialization,
        experience,
        consultation_Fee,
        consultation_Address,
        district,
        state,
        pincode,
        Image: req.cloudinaryImageUrl,
        startTime,
        endTime,
        password: hashedPassword
    });

    await newDoctor.save();

    return res.status(201).json({ message: "Registered successfully", data: newDoctor });

};

export const doctorlogin = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const Validuser = await doctors.findOne({ email });
        if (!Validuser) {
            return res.status(404).json({ message: "User not found" })
        }
        if (Validuser.approve == false) {
            return res.status(202).json({ message: "Your account is not approved" })
        };
        if (Validuser.isDeleted == true) {
            return res.status(202).json({ message: "Account is temporarily suspended" })
        };

        const validpassword = bcrypt.compareSync(password, Validuser.password);

        if (!validpassword) {
            return res.status(401).json({ message: "Invalid username or password" })
        }

        const token = Jwt.sign({ id: Validuser._id }, process.env.DOCTOR_JWT_SECRET_KEY);
        const { password: hashedPassword, ...rest } = Validuser._doc;
        const expiryDate = new Date(Date.now() + 60 * 1000);

        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate });
        res.status(200).json({ message: "successfully login", token, data: rest });

    } catch (error) {
        return next(error)
    }
};