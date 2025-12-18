// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Registration() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("John");
//   const [email, setEmail] = useState("john@example.com");
//   const [password, setPassword] = useState("qwerty");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch("https://coursesnodejs.onrender.com/registration", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });

//     if (response.ok) {
//       navigate("/login"); 
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50">
//       <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl border border-gray-200">

//         <h2 className="text-3xl font-extrabold text-center text-indigo-700">Registration</h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name</label>
//             <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
//           </div>

//           <div>
//             <label htmlFor="email">Email</label>
//             <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </div>

//           <button type="submit" data-testid="registration-button">Register</button>
//         </form>

//         <p className="text-center mt-4 text-sm text-gray-600">
//           Already have an account?
//           <Link data-testid="mock-link" to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }



// // src/components/Registration/Registration.tsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Registration() {
//   const navigate = useNavigate();

//   const [name, setName] = useState('John');
//   const [email, setEmail] = useState('john@example.com');
//   const [password, setPassword] = useState('qwerty');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('http://localhost:4000/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password }),
//     });

//     if (response.ok) {
//       navigate('/login');
//     } else {
//       // при необхідності можна обробити помилку
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50">
//       <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-indigo-700">Registration</h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name</label>
//             <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-lg" />
//           </div>

//           <div>
//             <label htmlFor="email">Email</label>
//             <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-lg" />
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-lg" />
//           </div>

//           <button data-testid="registration-button" type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg">Register</button>
//         </form>

//         <p className="text-center mt-4 text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link data-testid="mock-link" to="/login" className="text-indigo-600 font-medium">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    navigate('/login');
  };

  return (
    <div>
      <h2>Registration</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            id="name"
            data-testid="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            id="email"
            data-testid="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            id="password"
            data-testid="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button data-testid="mock-button" type="submit">
        Register
        </button>
      </form>

      <Link data-testid="mock-link" to="/login">
        Login
      </Link>
    </div>
  );
}
