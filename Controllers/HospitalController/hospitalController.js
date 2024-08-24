import hospitaljoi from "../../joiValidation/hospitalValidation.js"
import hospitals from "../../Models/hospitalSchema.js";
import bcrypt from 'bcrypt';

export const hospitalRegistration = async (req, res, next) => {

    try {

        const { value, error } = hospitaljoi.validate(req.body);

        if (error) {
            return res.status(404).json({ Details: error });
        }

        const { License_number, Hospital_name, Email, Phone_Number, Address, City, District, State, Pincode, Password } = value;

        const existingHospital = await hospitals.findOne({ License_number });

        if (existingHospital) {
            return res.status(200).json({ message: "Already Registered" });
        };

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newHospital = new hospitals({
            License_number,
            Hospital_name,
            Email,
            Phone_Number,
            Address,
            City,
            District,
            State,
            Pincode,
            Image: req.cloudinaryImageUrl,
            Password: hashedPassword
        });

        await newHospital.save();

        return res.status(201).json({ message: "Registered successfully", data: newHospital });

    } catch (error) {
        return next(error)
    }
};