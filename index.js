import React, { useState } from 'react';
import './Doctor.css';
import { useNavigate } from 'react-router-dom';

const doctors = [
    { id: 1, name: "Dr.Sarah Johson", specialty: "Cardiology" },
    { id: 2, name: "Dr.David Smith", specialty: "Orthopedics" },
    { id: 3, name: "Dr.Emily Brown", specialty: "Pediatrics" },
    { id: 4, name: "Dr.Michael Lee", specialty: "Dermatology" },
    { id: 5, name: "Dr.Olivia Garcia", specialty: "Gynecology & Obstetrics" },
    { id: 6, name: "Dr.John Miller", specialty: "Neurology" },
    { id: 7, name: "Dr.Katherine Wilson", specialty: "Ophthalmology" },
    { id: 8, name: "Dr.James Patel", specialty: "Gastroenterology" },
];

const AppointmentForm = ({ formData, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <label>
            Patient Name:
            <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
            />
        </label>

        <label>
            Contact Number:
            <input
                type="number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
            />
        </label>

        <label>
            Select Doctor:
            <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
            >
                <option value="">--Select Doctor--</option>
                {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                        {doctor.name} ({doctor.specialty})
                    </option>
                ))}
            </select>
        </label>

        <label>
            Appointment Date:
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />
        </label>

        <label>
            Appointment Time:
            <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
            />
        </label>

        <button type="submit">Book Appointment</button>

    </form>
);

const AppointmentList = ({ appointments }) => (

    <ul>
        {appointments.map((appointment, index) => (
            <li key={index}>
                <strong>{appointment.patientName}</strong> (Contact: {appointment.contact}) has an appointment with <strong>{appointment.doctor}</strong> on {appointment.date} at {appointment.time}
            </li>
        ))}
    </ul>
);

const Doctor = () => {
    const nav=useNavigate();
    const handleconfirm=()=>{
        nav("/Submit");
    }
    const [appointments, setAppointments] = useState([]);
    const [formData, setFormData] = useState({
        patientName: '',
        doctor: '',
        date: '',
        time: '',
        contact: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setAppointments([...appointments, formData]);
        setFormData({ patientName: '', doctor: '', date: '', time: '', contact: '' });
    };

    return (
        <div className="container">
            <h1>Book an Appointment</h1>
            <AppointmentForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
            <h2>Appointments</h2>
            <AppointmentList appointments={appointments} />
            <button onClick={handleconfirm}>Submit</button>
        </div>
    );
};

export default Doctor;
