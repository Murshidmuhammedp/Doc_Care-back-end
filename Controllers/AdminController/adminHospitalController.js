import hospitals from "../../Models/hospitalSchema.js";

export const pendingrequesthospital = async (req, res, next) => {

    try {

        const hospital = await hospitals.find();

        if (!hospital) {
            return res.status(404).json({ message: "Hospital's not Found" });
        };

        const pending = hospital.filter((items) => items.approve == false)

        if (!pending || pending.length == 0) {
            return res.status(202).json({ message: "No pending request" })
        }

        return res.status(200).json({ message: "Successfully fetch data", data: pending })

    } catch (error) {
        return next(error)
    }
};

export const rejectHospital = async (req, res, next) => {

    try {

        const id = req.params.id;

        await hospitals.findByIdAndDelete(id)

        return res.status(200).json({ message: "Rejected" });

    } catch (error) {
        return next(error)
    }
}

export const approveHospital = async (req, res, next) => {

    try {

        const id = req.params.id;

        const user = await hospitals.findById(id);

        if (user.approve == false) {
            (user.approve = true)
            await user.save()
            return res.status(200).json({ message: "Approved" })
        }


    } catch (error) {
        return next(error)
    }
}

export const dashboardHospital = async (req, res, next) => {
    try {

        const hospitalList = await hospitals.find();
        const filterDoctor = hospitalList.filter((data) => data.approve == true);
        if (!filterDoctor) {
            return res.status(202).json({ message: "No data found" });
        }

        return res.status(200).json({ message: "Data fetch successfully", data: filterDoctor })
    } catch (error) {
        return next(error)
    }
}