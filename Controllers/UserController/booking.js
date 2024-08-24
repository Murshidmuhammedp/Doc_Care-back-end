import Users from "../../Models/userSchema.js";
import doctors from '../../Models/doctorSchema.js';
import booking from "../../Models/bookingSchema.js";
import sendmail from "../../Modules/nodeMailer.js";
import moment from 'moment';

export const bookingAppointment = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const doctorId = req.params.doctorId;

        const user = await Users.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };

        const doctor = await doctors.findById(doctorId)
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        };

        const { name, phoneNumber, date, time } = req.body;

        const newBooking = await booking.create({
            userId: user._id,
            doctorId: doctor._id,
            patient_name: name,
            contact_number: phoneNumber,
            time,
            date: date,
        });

        const formattedDate = moment(date).format('ddd, MMM D, YYYY');

        user.booking.push(newBooking._id);
        await user.save();
        doctor.booking.push(newBooking._id);
        await doctor.save()

        const Userdata = {
            from: user.username,
            email: user.email,
            subject: "Your booking status",
            text: `We are pleased to confirm your appointment with Dr.${doctor.full_Name}.`,
            date: `${formattedDate}`,
            time: `${time}`
        };
        await sendmail(Userdata);

        const Doctordata = {
            from: `Dr.${doctor.full_Name}`,
            email: doctor.email,
            subject: 'New Appointment Booked',
            text: ` A new appointment has been booked by ${name}`,
            date: `${formattedDate}`,
            time: `${time}`
        };

        await sendmail(Doctordata);

        return res.status(200).json({ message: "Booking Successfully Completed" })

    } catch (error) {
        return next(error)
    }
}

export const bookedTimeSlot = async (req, res) => {
    try {
        const Id = req.params.Id;
        const { date } = req.query;
        const bookings = await booking.find({ doctorId: Id, date: date });
        return res.status(200).json({ data: bookings });
    } catch (error) {
        return res.status(500).send({ error: "error fetching bookings" });
    }
}

export const previousBooking = async (req, res, next) => {
    try {
        const Id = req.params.Id;

        const bookings = await booking.find({ userId: Id }).populate('doctorId')

        if (!bookings) {
            return res.status(202).json({ message: "No Previous Booking" });
        }

        return res.status(200).json({ message: "Fetch data successfully", data: bookings })
    } catch (error) {
        return next(error)
    }
}