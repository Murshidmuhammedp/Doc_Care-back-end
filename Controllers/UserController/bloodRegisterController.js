import Blood from "../../Models/bloodRegisterSchema.js";
import bloodjoi from "../../joiValidation/bloodRegValidation.js"

export const bloodRegister = async (req, res, next) => {

    const { value, error } = bloodjoi.validate(req.body);

    if (error) {
        return res.status(400).json({ Details: error });
    }

    const { Name, Blood_group, Gender, Age, Email, Phone_number, District, State } = value;

    const newDonor = new Blood({
        Name,
        Blood_group,
        Gender,
        Age,
        Email,
        Phone_number,
        District,
        State
    });

    await newDonor.save();

    return res.status(202).json({ message: "Registered successfully", data: newDonor });
}