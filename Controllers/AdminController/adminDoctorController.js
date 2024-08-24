import doctors from "../../Models/doctorSchema.js"
import { filterData } from "../UserController/filterData.js";

export const pendingrequestdoctor = async (req, res, next) => {

    try {

        const doctor = await doctors.find({ approve: false });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor's not Found" });
        };

        return res.status(200).json({ message: "Successfully fetch data", data: doctor })

    } catch (error) {
        return next(error)
    }
};

export const rejectDoctor = async (req, res, next) => {

    try {

        const id = req.params.id;

        await doctors.findByIdAndDelete(id)

        return res.status(200).json({ message: "Rejected" });

    } catch (error) {
        return next(error)
    }
}

export const approvedoctor = async (req, res, next) => {

    try {

        const id = req.params.id;

        const user = await doctors.findById(id);

        user.approve = true
        await user.save()
        return res.status(200).json({ message: "Approved" })



    } catch (error) {
        return next(error)
    }
}

export const viewDoctors = async (req, res, next) => {
    try {
        const { gender, specialization, district } = req.query;
        const filterCriteria = {};
        if (gender) {
            filterCriteria.gender = { $regex: new RegExp(gender, 'i') };
        }
        if (specialization) {
            filterCriteria.specialization = { $regex: new RegExp(specialization, 'i') };
        }
        if (district) {
            filterCriteria.district = { $regex: new RegExp(district, 'i') };
        }
        const doctorsList = await doctors.find(filterCriteria);
        const filterDoctor = doctorsList.filter((data) => data.approve == true);
        if (!filterDoctor) {
            return res.status(202).json({ message: "No data found" });
        }

        return res.status(200).json({ message: "Data fetch successfully", data: filterDoctor })
    } catch (error) {
        return next(error)
    }
}

export const dashboardDoctors = async (req, res, next) => {
    try {

        const doctorsList = await doctors.find();
        const filterDoctor = doctorsList.filter((data) => data.approve == true);
        if (!filterDoctor) {
            return res.status(202).json({ message: "No data found" });
        }

        return res.status(200).json({ message: "Data fetch successfully", data: filterDoctor })
    } catch (error) {
        return next(error)
    }
}
