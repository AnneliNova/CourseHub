// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch("https://coursesnodejs.onrender.com/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password })
//     });

//     if (response.ok) {
//       const data = await response.json();

//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("token", data.token);

//       navigate("/courses"); // ← тест чекає саме це
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50">
//       <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl border border-gray-200">

//         <h2 className="text-3xl font-extrabold text-center text-indigo-700">Login</h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <button data-testid="login-button" type="submit">Login</button>
//         </form>

//         <p className="text-center mt-4 text-sm text-gray-600">
//           Don't have an account?
//           <Link data-testid="mock-link" to="/registration">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('http://localhost:4000/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       const data = await response.json();

//       // Тести очікують, що в localStorage під ключем 'user' збережеться саме ім'я, а не весь об'єкт
//       if (data.user && data.user.name) {
//         localStorage.setItem('user', data.user.name);
//       } else if (typeof data.user === 'string') {
//         // на випадок, якщо бекенд повертає рядок
//         localStorage.setItem('user', data.user);
//       }

//       if (data.result) {
//         localStorage.setItem('token', data.result);
//       }

//       navigate('/courses');
//     } else {
//       // Можна додати обробку помилок
//       // const err = await response.json();
//       // console.error(err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50">
//       <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
//         <h2 className="text-3xl font-extrabold text-center text-indigo-700">Login</h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border rounded-lg"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-4 py-2 border rounded-lg"
//               required
//             />
//           </div>

//           <button data-testid="login-button" type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg">
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-4 text-sm text-gray-600">
//           Don't have an account?{' '}
//           <Link data-testid="mock-link" to="/registration" className="text-indigo-600 font-medium">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    localStorage.setItem('token', data.result);
    localStorage.setItem('user', JSON.stringify({ name: data.user.name }));

    navigate('/courses');
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <label>
          Email:
          <input
            data-testid="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button data-testid="login-button" type="submit">
          Login
        </button>
      </form>

      <Link data-testid="mock-link" to="/registration">
        Registration
      </Link>
    </div>
  );
}
