"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const sampleData = [
    { name: 'John Doe', yearLevel: 'First Year', timeIn: '08:00 AM', timeOut: '05:00 PM' },
    { name: 'Jane Smith', yearLevel: 'Second Year', timeIn: '09:00 AM', timeOut: '06:00 PM' },
    { name: 'Alice Johnson', yearLevel: 'Third Year', timeIn: '07:30 AM', timeOut: '04:30 PM' },
];

const AssassinList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterYearLevel, setFilterYearLevel] = useState('');
    const router = useRouter();

    const filteredAssassins = sampleData
        .filter((assassin) =>
            assassin.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((assassin) =>
            filterYearLevel ? assassin.yearLevel === filterYearLevel : true
        );

    const handleLogoClick = () => {
        router.back();
    };

    return (
        <div
            style={{
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                backgroundImage: 'url(/images/violet.jpg)',
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
                    src="/images/assassin.jpg"
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
                    Assassin List
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
                    <option value="">All Year Levels</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Fourth Year">Fourth Year</option>
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
                    {filteredAssassins.map((item, index) => (
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
                                {item.name}
                            </td>
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                                    color: '#333',
                                }}
                            >
                                {item.yearLevel}
                            </td>
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                                    color: '#333',
                                }}
                            >
                                {item.timeIn}
                            </td>
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                                    color: '#333',
                                }}
                            >
                                {item.timeOut}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssassinList;
