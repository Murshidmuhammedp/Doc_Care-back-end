import booking from "../../Models/bookingSchema.js";
import doctors from "../../Models/doctorSchema.js";

export const pendingAppointments = async (req, res, next) => {
    try {
        const Id = req.params.doctorId;
        const doctor = await doctors.findById(Id).populate({
            path: 'booking',
        })

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not Found" })
        };
        const filterData = doctor.booking.filter((data) => data.status == "pending")
        if (!filterData || filterData.length == 0) {
            return res.status({ message: "No booking Found" })
        };
        return res.status(200).json({ message: "Fetched Successfully", data: filterData })

    } catch (error) {
        return next(error)
    }
}

export const appointmentApprove = async (req, res, next) => {
    try {
        const Id = req.params.Id;

        const appointment = await booking.findById(Id);
        if (!appointment) {
            return res.status(404).json({ message: "Booking not found" })
        };
        appointment.status = "Checked";
        await appointment.save();
        return res.status(200).json({ message: "Patient Checked" });
    } catch (error) {
        return next(error)
    }
};

export const appointmentReject = async (req, res, next) => {
    try {
        const Id = req.params.Id;

        const appointment = await booking.findById(Id);
        if (!appointment) {
            return res.status(404).json({ message: "Booking not found" })
        };
        appointment.status = "Rejected";
        await appointment.save();
        return res.status(200).json({ message: "Appointment Rejected" });
    } catch (error) {
        return next(error)
    }
}

export const previousAppointment = async (req, res, next) => {
    try {
        const Id = req.params.Id;

        const doctor = await doctors.findById(Id).populate({
            path: 'booking'
        });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not Found" })
        }
        const filterData = doctor.booking.filter((data) => data.status !== "pending")
        if (!filterData || filterData.length == 0) {
            return res.status({ message: "No booking Found" })
        };
        return res.status(200).json({ message: "Fetched Successfully", data: filterData });
    } catch (error) {
        return next(error)
    }
}

export const totalbooking = async (req, res, next) => {
    try {
        const Id = req.params.doctorId;
        const totalBookings = await doctors.findById(Id).populate({
            path: 'booking',
        })

        return res.status(200).json({ message: "Fetched Successfully", data: totalBookings });

    } catch (error) {
        return next(error)
    }
}