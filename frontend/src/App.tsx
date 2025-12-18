// import React, { useState, useContext, createContext, useMemo } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// import { Menu, X, LogIn, LogOut, BookOpen, Plus, User } from 'lucide-react'; // Використовуємо Lucide для іконок

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (username: string, token: string) => void;
//   logout: () => void;
//   user: string | null;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<string | null>(null);

//   const login = (username: string, token: string) => {
//     setIsAuthenticated(true);
//     setUser(username);
//     console.log(`User ${username} logged in with token: ${token}`);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     console.log('User logged out');
//   };

//   const value = useMemo(() => ({ isAuthenticated, login, logout, user }), [isAuthenticated, user]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useAuth();
  
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// const Header: React.FC = () => {
//   const { isAuthenticated, logout, user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <header 
//       className="flex justify-between items-center p-4 bg-gray-100 shadow-lg border-b-4 border-indigo-500 sticky top-0 z-10"
//     >
//       <div 
//         className="flex items-center space-x-2 text-2xl font-extrabold text-indigo-600 cursor-pointer"
//         onClick={() => navigate('/')}
//       >
//         <BookOpen className="w-8 h-8" />
//         <span>COURSE APP</span>
//       </div>
      
//       <div className="flex items-center space-x-4">
//         {isAuthenticated ? (
//           <>
//             <div className="flex items-center space-x-2 text-gray-700 font-semibold">
//               <User className="w-5 h-5" />
//               <span>{user}</span>
//             </div>
//             <button 
//               onClick={() => logout()}
//               className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
//             >
//               <LogOut className="w-5 h-5" />
//               <span>ВИХІД</span>
//             </button>
//           </>
//         ) : (
//           <button 
//             onClick={() => navigate('/login')}
//             className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
//           >
//             <LogIn className="w-5 h-5" />
//             <span>ЛОГІН</span>
//           </button>
//         )}
//       </div>
//     </header>
//   );
// };

// const Courses: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Список Курсів (Захищений)</h1>
//       <button 
//         onClick={() => navigate('/create-course')}
//         className="mb-4 flex items-center space-x-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition duration-200"
//       >
//         <Plus className="w-5 h-5" />
//         <span>ДОДАТИ КУРС</span>
//       </button>
//       <p className="text-green-600 font-medium bg-green-50 p-3 rounded-lg border border-green-200">
//         Ви бачите цю сторінку, бо ви успішно автентифіковані!
//       </p>
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Імітація карток курсу */}
//         {[1, 2, 3].map(i => (
//           <div 
//             key={i} 
//             className="p-4 border rounded-lg shadow-md bg-white hover:shadow-xl transition duration-300 cursor-pointer"
//             onClick={() => navigate(`/courses/${i}`)}
//           >
//             <h3 className="text-xl font-bold text-blue-700">Курс {i}</h3>
//             <p className="text-gray-600 mt-2">Короткий опис курсу {i}.</p>
//             <span className="text-sm text-indigo-500 font-semibold mt-2 block">Детальніше &rarr;</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const CreateCourse: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="p-8 max-w-2xl mx-auto bg-white shadow-xl rounded-xl mt-10">
//       <h1 className="text-3xl font-bold text-indigo-700 mb-6">Створення нового курсу (Захищене)</h1>
//       <p className="text-green-600 font-medium bg-green-50 p-3 rounded-lg border border-green-200 mb-6">
//         Ви можете створити курс, оскільки ви увійшли.
//       </p>
//       <p className="text-gray-700 mb-6">Тут буде велика форма для створення курсу...</p>
//       <button 
//         onClick={() => navigate('/courses')}
//         className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
//       >
//         Назад до списку
//       </button>
//     </div>
//   );
// };

// const CourseInfo: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-10">
//       <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Деталі Курсу (Захищений)</h1>
//       <p className="text-gray-700 leading-relaxed mb-8">
//         Це детальна інформація про конкретний курс. Маршрут, що відображає цей компонент, також повинен бути захищений, якщо ви не хочете, щоб неавтентифіковані користувачі бачили деталі.
//       </p>
//       <button 
//         onClick={() => navigate('/courses')}
//         className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
//       >
//         <span className="font-semibold">← НАЗАД</span>
//       </button>
//     </div>
//   );
// };

// const Login: React.FC = () => {
//   const { login, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('user@example.com');
//   const [password, setPassword] = useState('password123');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     login(username, 'mock-jwt-token-12345');
//     navigate('/courses'); // Перенаправлення на захищену сторінку
//   };

//   if (isAuthenticated) {
//     return <Navigate to="/courses" replace />;
//   }

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50">
//       <form 
//         onSubmit={handleSubmit}
//         className="p-8 w-full max-w-md bg-white shadow-2xl rounded-xl"
//       >
//         <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">ВХІД</h2>
//         <div className="space-y-4">
//           <input 
//             type="email" 
//             placeholder="Електронна пошта" 
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <input 
//             type="password" 
//             placeholder="Пароль" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//         </div>
//         <button 
//           type="submit"
//           className="w-full mt-6 p-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
//         >
//           Увійти
//         </button>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Ще не маєте облікового запису? 
//           <span 
//             className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-semibold ml-1"
//             onClick={() => navigate('/registration')}
//           >
//             Зареєструватися
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// const Registration: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50">
//       <div className="p-8 w-full max-w-md bg-white shadow-2xl rounded-xl">
//         <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">РЕЄСТРАЦІЯ</h2>
//         <p className="text-gray-700 text-center mb-6">Тут буде форма реєстрації.</p>
//         <button 
//           onClick={() => navigate('/login')}
//           className="w-full mt-4 p-3 bg-indigo-500 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300"
//         >
//           Перейти до входу
//         </button>
//       </div>
//     </div>
//   );
// };

// const AppContent: React.FC = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         <Routes>
//           {/* Публічні маршрути */}
//           <Route path="/" element={<Navigate to="/courses" replace />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/registration" element={<Registration />} />

//           {/* ЗАХИЩЕНІ МАРШРУТИ */}
//           {/* Використовуємо PrivateRoute як обгортку для елемента */}
//           <Route 
//             path="/courses" 
//             element={
//               <PrivateRoute>
//                 <Courses />
//               </PrivateRoute>
//             } 
//           />
//           <Route 
//             path="/courses/:courseId" 
//             element={
//               <PrivateRoute>
//                 <CourseInfo />
//               </PrivateRoute>
//             } 
//           />
//           <Route 
//             path="/create-course" 
//             element={
//               <PrivateRoute>
//                 <CreateCourse />
//               </PrivateRoute>
//             } 
//           />
          
//           {/* Маршрут 404 */}
//           <Route path="*" element={
//             <div className="text-center p-10">
//               <h1 className="text-4xl font-bold text-red-500">404</h1>
//               <p className="text-xl text-gray-700">Сторінку не знайдено.</p>
//             </div>
//           } />

//         </Routes>
//       </main>
//     </div>
//   );
// };

// const App: React.FC = () => (
//   <Router>
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   </Router>
// );

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/CourseCard';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';
import PrivateRoute from './routing/PrivateRoute';

export default function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Default redirection */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/courses" /> : <Navigate to="/login" />
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Private routes */}
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />

        <Route
          path="/courses/add"
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />

        <Route
          path="/courses/:courseId"
          element={
            <PrivateRoute>
              <CourseInfo />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
