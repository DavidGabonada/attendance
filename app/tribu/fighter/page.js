"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// const sampleData = [
//     { name: 'John Doe', yearLevel: 'First Year', timeIn: '08:00 AM', timeOut: '05:00 PM' },
//     { name: 'Jane Smith', yearLevel: 'Second Year', timeIn: '09:00 AM', timeOut: '06:00 PM' },
//     { name: 'Alice Johnson', yearLevel: 'Third Year', timeIn: '07:30 AM', timeOut: '04:30 PM' },
// ];

const FighterList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterYearLevel, setFilterYearLevel] = useState('');
    const [names, setNames] = useState([]);
    const [tribes, setTribes] = useState([]);
    const [years, setYears] = useState([]);
    const router = useRouter();
    const [filteredFighters, setFilteredFighters] = useState([]);

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
        const getAllStudentByTribu = async () => {
            try {
                const jsonData = { tribuId: 5 };
                const formData = new FormData();
                formData.append("operation", "getAllStudentByTribu");
                formData.append("json", JSON.stringify(jsonData));
                const res = await axios.post('http://localhost/tribu/students.php', formData);
                console.log("RES NI GEREGETEGTGETGEG", JSON.stringify(res.data));
                setNames(res.data);
                setFilteredFighters(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            //mana ni
        };

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
        const fetchTimein = async () => {
            try {
                const formData = new FormData();
                formData.append("operation", "getTimein");
                const res = await axios.post('http://localhost/tribu/students.php', formData);
                console.log("RES NI year", JSON.stringify(res.data));
                setYears(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            //mana ni
        };

        // const filteredFighters = names
        //     .filter((fighter) =>
        //         fighter.name.toLowerCase().includes(searchTerm.toLowerCase())
        //     )
        //     .filter((fighter) =>
        //         filterYearLevel ? fighter.yearLevel === filterYearLevel : true
        //     );


        // filteredFighters();
        // handleLogoClick();
        fetchTribu();
        getAllStudentByTribu();
        fetchYear();
    }, []);
    const handleLogoClick = () => {
        router.back();
    };

    // useffect ni pang filter

    useEffect(() => {
        const filteredFighter = names.filter((fighter) => Number(fighter.student_yrId) === Number(filterYearLevel));
        setFilteredFighters(filteredFighter);
    }, [filterYearLevel])



    return (
        <div
            style={{
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                backgroundImage: 'url(/images/red.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                color: '#fff',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                    zIndex: 1000,
                }}
            >
                <img
                    src="/images/fighter.jpg"
                    alt="Logo"
                    style={{
                        width: '60px',
                        height: '60px',
                        marginRight: '15px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.6)',
                        objectFit: 'cover',
                    }}
                    onClick={handleLogoClick}
                />
                <h1
                    style={{
                        fontSize: '28px',
                        color: '#fff',
                    }}
                >
                    Fighter List
                </h1>
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px',
                }}
            >
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        width: '220px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                />

                <select
                    value={filterYearLevel}
                    onChange={(e) => setFilterYearLevel(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#333',
                        zIndex: 10,
                    }}
                >
                    <option value="">Year Level</option>
                    <option value={1}>First Year</option>
                    <option value={2}>Second Year</option>
                    <option value={3}>Third Year</option>
                    <option value={4}>Fourth Year</option>
                </select>
            </div>

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '5px',
                    overflow: 'hidden',
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                backgroundColor: '#333',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            Name
                        </th>
                        <th
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                backgroundColor: '#333',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            Year Level
                        </th>
                        <th
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                backgroundColor: '#333',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            Time In
                        </th>
                        <th
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                backgroundColor: '#333',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                            }}
                        >
                            Time Out
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFighters.map((item, index) => (
                        <tr
                            key={index}
                            style={{
                                backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
                            }}
                        >
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                                    color: '#333',
                                }}
                            >
                                {item.student_Name}
                            </td>
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                                    color: '#333',
                                }}
                            >
                                {item.year_type}
                            </td>
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                                    color: '#333',
                                }}
                            >
                                {item.attendance_timein}
                            </td>
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                                    color: '#333',
                                }}
                            >
                                {item.attendance_timeout}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FighterList;
