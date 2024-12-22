// src/components/ProtectedRoute.jsx
// "use client"
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { isAuthenticated } from './authService';

// const ProtectedRoute = ({ children }) => {
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       router.push('/login');
//     }
//   }, [router]);

//   // نعرض محتوى الصفحة فقط إذا كان المستخدم مسجل الدخول
//   return isAuthenticated() ? children : null;
// };

// export default ProtectedRoute;