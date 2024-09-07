"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [category, setCategory] = useState('0');
    const [year, setYear] = useState('0'); // State for year level filtering
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [allStudents, setAllStudents] = useState([]);
    const [tribeAttendanceCount, setTribeAttendanceCount] = useState({});

    const fetchReports = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("operation", "getallattendace");
        try {
            const response = await axios.post('http://localhost/tribu/students.php', formData);
            console.log("response", response.data);
            if (response.data) {
                setReports(response.data);
                setAllStudents(response.data);
                calculateTribeAttendance(response.data);
            } else {
                console.error('No data received from API');
                setReports([]);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            setReports([]);
            alert('Failed to fetch reports. Please try again later.');
        }
        setLoading(false);
    };

    const calculateTribeAttendance = (students) => {
        const tribeCount = {};
        students.forEach(student => {
            const tribeId = student.student_tribuId;
            if (!tribeCount[tribeId]) {
                tribeCount[tribeId] = 1;
            } else {
                tribeCount[tribeId]++;
            }
        });
        setTribeAttendanceCount(tribeCount);
    };

    useEffect(() => {
        let filteredStudents = allStudents;

        if (category !== "0") {
            filteredStudents = filteredStudents.filter(student =>
                parseInt(student.student_tribuId) === parseInt(category)
            );
        }

        if (year !== "0") {
            filteredStudents = filteredStudents.filter(student =>
                parseInt(student.year_type) === parseInt(year)
            );
        }

        setReports(filteredStudents);
    }, [category, year, allStudents]);

    const handleSearch = () => {
        const filteredReports = allStudents.filter((report) =>
            report.student_Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setReports(filteredReports);
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div className="flex flex-col md:flex-row p-8 bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen">
            <div className="flex-1 bg-white p-8 rounded-xl shadow-xl mb-6 md:mb-0 md:mr-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Attendance Report</h1>
                <div className="flex flex-col gap-4 mb-8">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="0">All Tribes ({allStudents.length})</option>
                        <option value="6">Magic ({tribeAttendanceCount[6] || 0})</option>
                        <option value="2">Mage ({tribeAttendanceCount[2] || 0})</option>
                        <option value="5">Fighter ({tribeAttendanceCount[5] || 0})</option>
                        <option value="8">Support ({tribeAttendanceCount[8] || 0})</option>
                        <option value="3">Assassin ({tribeAttendanceCount[3] || 0})</option>
                        <option value="7">Marksman ({tribeAttendanceCount[7] || 0})</option>
                        <option value="1">Jungler ({tribeAttendanceCount[1] || 0})</option>
                        <option value="4">Tank ({tribeAttendanceCount[4] || 0})</option>
                    </select>

                    {/* Year level filter */}
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="0">All Year Levels</option>
                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                        <option value="3">Third Year</option>
                        <option value="4">Fourth Year</option>
                    </select>

                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search Students"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="p-3 border rounded-l-md flex-grow text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            onClick={handleSearch}
                            className="p-3 bg-purple-500 text-white rounded-r-md hover:bg-purple-600 transition-all duration-300"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="flex justify-center items-center my-6">
                        <div className="w-10 h-10 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                )}

                <table className="min-w-full bg-white border rounded-lg shadow-lg text-gray-800">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold">Name</th>
                            <th className="p-4 text-left font-semibold">Year Level</th>
                            <th className="p-4 text-left font-semibold">Time In</th>
                            <th className="p-4 text-left font-semibold">Time Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={index} className="border-t hover:bg-purple-50 transition-colors duration-200">
                                <td className="p-4">{report.student_Name}</td>
                                <td className="p-4">{report.year_type}</td>
                                <td className="p-4">{report.attendance_timein}</td>
                                <td className="p-4">{report.attendance_timeout}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
