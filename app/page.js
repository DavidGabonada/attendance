// "use client";
// import React, { useState } from 'react';
// import QRCode from 'qrcode.react';

// const Attendance = () => {
//   // Static data for dropdowns
//   const namesData = [
//     { id: '1', name: 'Alice' },
//     { id: '2', name: 'Bob' },
//     { id: '3', name: 'Charlie' }
//   ];

//   const tribesData = [
//     { id: '1', tribe: 'Tribe A' },
//     { id: '2', tribe: 'Tribe B' },
//     { id: '3', tribe: 'Tribe C' }
//   ];

//   const yearsData = [
//     { id: '1', year: 'Freshman' },
//     { id: '2', year: 'Sophomore' },
//     { id: '3', year: 'Junior' },
//     { id: '4', year: 'Senior' }
//   ];

//   const [names, setNames] = useState(namesData);
//   const [tribes, setTribes] = useState(tribesData);
//   const [years, setYears] = useState(yearsData);
//   const [studentId, setStudentId] = useState('');
//   const [selectedName, setSelectedName] = useState('');
//   const [selectedTribe, setSelectedTribe] = useState('');
//   const [selectedYear, setSelectedYear] = useState('');
//   const [loginQrValue, setLoginQrValue] = useState(''); // State for login QR code
//   const [userQrValue, setUserQrValue] = useState(''); // State for user QR code

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Generate QR codes
//     const loginQrData = `Login ID: ${studentId}`;
//     const userQrData = `Student ID: ${studentId}, Year: ${selectedYear}, Tribe: ${selectedTribe}, Name: ${selectedName}`;

//     setLoginQrValue(loginQrData);
//     setUserQrValue(userQrData);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
//         <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Attendance Form</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="year" className="block text-gray-700 font-medium mb-2">Year Level:</label>
//             <select
//               id="year"
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//               className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
//             >
//               <option value="">Select a year level</option>
//               {years.map(year => (
//                 <option key={year.id} value={year.id}>{year.year}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="tribe" className="block text-gray-700 font-medium mb-2">Tribe:</label>
//             <select
//               id="tribe"
//               value={selectedTribe}
//               onChange={(e) => setSelectedTribe(e.target.value)}
//               className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
//             >
//               <option value="">Select a tribe</option>
//               {tribes.map(tribe => (
//                 <option key={tribe.id} value={tribe.id}>{tribe.tribe}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
//             <select
//               id="name"
//               value={selectedName}
//               onChange={(e) => setSelectedName(e.target.value)}
//               className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
//             >
//               <option value="">Select a name</option>
//               {names.map(name => (
//                 <option key={name.id} value={name.id}>{name.name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="studentId" className="block text-gray-700 font-medium mb-2">Student ID:</label>
//             <input
//               type="text"
//               id="studentId"
//               value={studentId}
//               onChange={(e) => setStudentId(e.target.value)}
//               placeholder="Enter Student ID"
//               className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-150 ease-in-out transform hover:scale-105"
//           >
//             Submit
//           </button>
//         </form>

//         {/* Display Login QR Code */}
//         {loginQrValue && (
//           <div className="mt-8 text-center">
//             <h2 className="text-xl font-semibold mb-4">Login QR Code:</h2>
//             <QRCode value={loginQrValue} size={256} className="mx-auto" />
//           </div>
//         )}

//         {/* Display User QR Code */}
//         {userQrValue && (
//           <div className="mt-8 text-center">
//             <h2 className="text-xl font-semibold mb-4">User QR Code:</h2>
//             <QRCode value={userQrValue} size={256} className="mx-auto" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Attendance;


"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaUserPlus, FaTimes } from 'react-icons/fa';
import { Package2 } from 'lucide-react';
import Link from 'next/link';

export default function AttendanceDashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentId, setNewStudentId] = useState('');
  const [newStudentYear, setNewStudentYear] = useState('');
  const [newStudentTribu, setNewStudentTribu] = useState('');
  const [tribus, setTribus] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);

  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
  const router = useRouter();

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost/tribu/tribu.php?action=get_students');
      if (Array.isArray(res.data)) {
        setStudents(res.data);
        setStudentOptions(res.data.map(student => ({ id: student.id, name: student.name })));
      } else {
        console.error('Fetched data is not an array:', res.data);
      }
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get('http://localhost/tribu/tribu.php?action=get_attendance');
      setAttendance(res.data);
    } catch (error) {
      console.error('Error fetching attendance', error);
    }
  };

  const fetchTribus = async () => {
    try {
      const res = await axios.get('http://localhost/tribu/tribu.php?action=get_tribus');
      if (Array.isArray(res.data)) {
        setTribus(res.data);
      } else {
        console.error('Fetched tribus data is not an array:', res.data);
      }
    } catch (error) {
      console.error('Error fetching tribus', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
    fetchTribus();
  }, []);

  const handleMarkAttendance = async (studentId) => {
    try {
      await axios.post('http://localhost/tribu/tribu.php?action=mark_attendance', { studentId });
      fetchAttendance();
    } catch (error) {
      console.error('Error marking attendance', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post('http://localhost/tribu/tribu.php?action=add_student', {
        name: newStudentName,
        studentId: newStudentId,
        year: newStudentYear,
        tribu: newStudentTribu
      });
      fetchStudents();
      setNewStudentName('');
      setNewStudentId('');
      setNewStudentYear('');
      setNewStudentTribu('');
      setIsAddStudentModalOpen(false);
    } catch (error) {
      console.error('Error adding student', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleViewAttendance = () => {
    router.push('/attendance');
  };

  const handleViewReports = () => {
    router.push('/reports');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:static`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white focus:outline-none md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <button onClick={() => setIsAddStudentModalOpen(true)} className="flex items-center space-x-2 p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-transform duration-300 transform hover:scale-105">
                <FaUserPlus className="text-white" />
                <span>Add Student</span>
              </button>
            </li>
            <li>
              <button onClick={handleViewAttendance} className="flex items-center space-x-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-transform duration-300 transform hover:scale-105">
                <span>Attendance</span>
              </button>
            </li>
            <li>
              <button onClick={handleViewReports} className="flex items-center space-x-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-transform duration-300 transform hover:scale-105">
                <span>Attendance Reports</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </nav>
      </aside>

      <main className={`flex-1 p-8 bg-gray-100 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Attendance Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { image: '/images/fighter.jpg', title: 'Fighter', tribu: 'fighter' },
            { image: '/images/jungler.jpg', title: 'Jungler', tribu: 'jungler' },
            { image: '/images/assassin.jpg', title: 'Assassin', tribu: 'assassin' },
            { image: '/images/mage.jpg', title: 'Mage', tribu: 'mage' },
            { image: '/images/magic.jpg', title: 'Magic', tribu: 'magic' },
            { image: '/images/marksman.jpg', title: 'Marksman', tribu: 'marksman' },
            { image: '/images/support.jpg', title: 'Support', tribu: 'support' },
            { image: '/images/tank.jpg', title: 'Tank', tribu: 'tank' },
          ].map((card, index) => (
            <Link key={index} href={`/tribu/${card.tribu}`} passHref>
              <div className="relative h-80 bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
                <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Add Student</h2>
              <button onClick={() => setIsAddStudentModalOpen(false)} className="text-gray-600 hover:text-gray-900">
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Student ID</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStudentId}
                onChange={(e) => setNewStudentId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Year</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStudentYear}
                onChange={(e) => setNewStudentYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Tribu</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newStudentTribu}
                onChange={(e) => setNewStudentTribu(e.target.value)}
              >
                <option value="">Select Tribu</option>
                {tribus.map((tribu, index) => (
                  <option key={index} value={tribu.name}>
                    {tribu.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button onClick={handleAddStudent} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
