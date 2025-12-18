// import React, { useState, useEffect } from 'react';

// const useNavigate = () => (path: string) => {
//   if (typeof window !== 'undefined') window.location.pathname = path;
// };

// const Link = ({ to, children, ...props }) => (
//   <a href={to} data-testid="mock-link" {...props}>
//     {children}
//   </a>
// );

// const Header: React.FC = () => {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const stored = localStorage.getItem('user');
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         setUserName(parsed.name || null);
//       } catch {
//         setUserName(null);
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setUserName(null);
//     navigate('/login');
//   };

//   return (
//     <header className="flex justify-between items-center p-4 bg-gray-100 border-b shadow">
//       <Link to="/">
//         <img
//           src="https://placehold.co/120x30/4f46e5/ffffff/png?text=COURSE+APP"
//           alt="logo"
//           className="h-8"
//         />
//       </Link>

//       <div>
//         {userName ? (
//           <>
//             <span data-testid="header-user-name" className="mr-4 font-semibold">
//               {userName}
//             </span>
//             <button
//               data-testid="logout-button"
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg"
//             >
//               LOGOUT
//             </button>
//           </>
//         ) : (
//           <Link to="/login">
//             <button data-testid="login-button" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
//               LOGIN
//             </button>
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';

// const Header: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const stored = localStorage.getItem('user');
//     if (stored) {
//       // Тести очікують простий рядок з ім'ям, тому беремо як є
//       setUserName(stored);
//     } else {
//       setUserName(null);
//     }
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setUserName(null);
//     navigate('/login');
//   };

//   // Ховаємо user/logout на сторінках логіна/реєстрації
//   const hideAuthActions = location.pathname === '/login' || location.pathname === '/registration';

//   return (
//     <header className="flex justify-between items-center p-4 bg-gray-100 border-b shadow">
//       <Link data-testid="mock-link" to="/">
//         <img
//           src="https://placehold.co/120x30/4f46e5/ffffff/png?text=COURSE+APP"
//           alt="logo"
//           className="h-8"
//         />
//       </Link>

//       <div>
//         {!hideAuthActions && userName ? (
//           <>
//             <span data-testid="header-user-name" className="mr-4 font-semibold">{userName}</span>
//             <button data-testid="logout-button" onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg">
//               LOGOUT
//             </button>
//           </>
//         ) : !hideAuthActions ? (
//           <Link data-testid="mock-link" to="/login">
//             <button data-testid="login-button" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">LOGIN</button>
//           </Link>
//         ) : null}
//       </div>
//     </header>
//   );
// };

// export default Header;


import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const hideHeader =
    location.pathname === '/login' || location.pathname === '/registration';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header>
      {!hideHeader && (
        <div>
          {token ? (
            <>
              {user.name && <span>{user.name}</span>}
              <button data-testid="logout" onClick={logout}>
                LOGOUT
              </button>
            </>
          ) : (
            <Link to="/login">
              <button>LOGIN</button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
