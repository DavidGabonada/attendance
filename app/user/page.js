"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import QRCode from 'qrcode.react';

const Attendance = () => {
    const [names, setNames] = useState([]);
    const [tribes, setTribes] = useState([]);
    const [years, setYears] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [selectedTribe, setSelectedTribe] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    // const [qrValue, setQrValue] = useState('');
    const [attendance, setAttendance] = useState("");

    useEffect(() => {

        const fetchTribu = async () => {
            try {
                const formData = new FormData();
                formData.append("operation", "getTribu");
                const res = await axios.post('http://localhost/tribu/tribu.php', formData);
                console.log("RES NI TRIBU", JSON.stringify(res.data));
                setTribes(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            //mana ni
        };
        const fetchStudents = async () => {
            try {
                const formData = new FormData();
                formData.append("operation", "getStudents");
                const res = await axios.post('http://localhost/tribu/students.php', formData);
                console.log("RES NI students", JSON.stringify(res.data));
                setAllStudents(res.data);
                setNames(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            //mana ni
        };
        // const fetchAttendance = async () => {
        //     try {
        //         const formData = new FormData();
        //         formData.append("operation", "getattendance");
        //         const res = await axios.post('http://localhost/tribu/students.php', formData);
        //         console.log("RES NI students", JSON.stringify(res.data));
        //         setAllStudents(res.data);
        //         setNames(res.data);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        //     //mana ni
        // };



        const fetchYear = async () => {
            try {
                const formData = new FormData();
                formData.append("operation", "getyear");
                const res = await axios.post('http://localhost/tribu/students.php', formData);
                console.log("RES NI year", JSON.stringify(res.data));
                setYears(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            //mana ni
        };

        fetchTribu();
        fetchStudents();
        fetchYear();
        // fetchAttendance();
    }, []);

    const handleAttendance = async (type) => {
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get current time in 'YYYY-MM-DD HH:MM:SS' format
        const apiUrl = 'http://localhost/tribu/students.php';

        try {
            const jsonData = {
                studentsId: selectedName,
                timeout: currentTime,
            }

            console.log("JSON DATA NI HANDLESAKDJWOPIQH: ", JSON.stringify(jsonData));
            const formData = new FormData();
            formData.append("operation", type === "in" ? "getattendance" : "gettimeout");
            formData.append("json", JSON.stringify(jsonData));

            const res = await axios.post(apiUrl, formData);
            console.log(`${type === "in" ? "Time In" : "Time Out"} Response`, res.data);

            if (res.data.status === 1) {
                setAttendance(`${type === "in" ? "Time In" : "Time Out"} recorded successfully!`);
            } else {
                setAttendance(`Error recording ${type === "in" ? "Time In" : "Time Out"}: ${res.data.message}`);
            }

        } catch (error) {
            console.error(`Error during ${type === "in" ? "Time In" : "Time Out"}:`, error);
            setAttendance(`Error recording ${type === "in" ? "Time In" : "Time Out"}`);
        }
    };




    const handleSubmit = (e) => {
        e.preventDefault();

        const qrData = `ID: ${studentId}, Year: ${selectedYear}, Tribe: ${selectedTribe}, Name: ${selectedName}`;
        setQrValue(qrData);
    };
    useEffect(() => {
        const filteredStudents = allStudents.filter((student) => Number(student.student_tribuId) === Number(selectedTribe) && Number(student.student_yrId) === Number(selectedYear));
        setNames(filteredStudents);
    }, [selectedTribe, selectedYear]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Attendance Form</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="year" className="block text-gray-700 font-medium mb-2">Year Level:</label>
                        <select
                            id="year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
                        >
                            <option value="">Select a year level</option>
                            {years.map((year, index) => (
                                <option key={index} value={year.year_id}>{year.year_type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="tribe" className="block text-gray-700 font-medium mb-2">Tribe:</label>
                        <select
                            id="tribe"
                            value={selectedTribe}
                            onChange={(e) => setSelectedTribe(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
                        >
                            <option value="">Select a tribe</option>
                            {tribes.map((tribe, index) => (
                                <option key={index} value={tribe.tribu_Id}>{tribe.tribu_Name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
                        <select
                            id="name"
                            value={selectedName}
                            onChange={(e) => setSelectedName(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
                        >
                            <option value="">Select a name</option>
                            {names.map((name, index) => (
                                <option key={index} value={name.student_Id}>{name.student_Name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className="w-full py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-150 ease-in-out transform hover:scale-105"
                        onClick={() => handleAttendance("in")}
                    >
                        Time In
                    </button>

                    <button
                        type="button"
                        className="w-full py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-orange-700 transition-colors duration-150 ease-in-out transform hover:scale-105"
                        onClick={() => handleAttendance("out")}
                    >
                        Time Out
                    </button>


                </form>

                {/*  */}
            </div>
        </div>
    );
};

export default Attendance;
