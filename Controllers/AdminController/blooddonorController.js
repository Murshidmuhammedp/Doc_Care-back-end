import Blood from "../../Models/bloodRegisterSchema.js";

export const dashboardblood = async (req, res, next) => {
    try {

        const donorsList = await Blood.find();
        if (!donorsList) {
            return res.status(202).json({ message: "No data found" });
        }
        return res.status(200).json({ message: "Data fetch successfully", data: donorsList })
    } catch (error) {
        return next(error)
    }
}