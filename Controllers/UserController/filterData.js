import doctors from "../../Models/doctorSchema.js"

export const filterData = async (req, res, next) => {
    try {

        const { specialization, district } = req.query;

        const filterCriteria = {};
        if (specialization) {
            filterCriteria.specialization = { $regex: new RegExp(specialization, 'i') };
        }
        if (district) {
            filterCriteria.district = { $regex: new RegExp(district, 'i') };
        }
        const doctorsList = await doctors.find(filterCriteria);

        const filterData = doctorsList.filter((item) => item.approve == true);

        if (!filterData) {
            return res.status(202).json({ message: "No data found" });
        }


        return res.status(200).json({ message: "Data fetch successfully", data: filterData });

    } catch (error) {
        return next(error)
    }
}