import Users from '../../Models/userSchema.js'
export const userProfile = async (req, res, next) => {
    try {
        const Id = req.params.Id;
        const user = await Users.findById(Id)
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        return res.status(200).json({ message: "User found successfully", data: user });
    } catch (error) {
        return next(error)
    }
}