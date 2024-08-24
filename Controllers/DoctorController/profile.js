import doctors from "../../Models/doctorSchema.js"

export const profile = async (req, res, next) => {
    try {
        const Id = req.params.Id;
        const doctor = await doctors.findById(Id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor Not found" });
        }
        return res.status(200).json({ message: "Successfully Fetched", data: doctor })
    } catch (error) {
        return next(error)
    }
}

export const editProfile = async (req, res, next) => {
    try {
            
    } catch (error) {
        return next(error);
    }
}