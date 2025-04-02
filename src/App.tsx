// import { Navigate, Route, Routes } from 'react-router-dom';
// import { useAuthStore } from './store/userAuthStore.ts';
// import { Login } from './Pages/Login.tsx';
// import { Register } from './Pages/Register.tsx';
// import { Container, CssBaseline } from '@mui/material';
// import { Home } from './Pages/Home.tsx';
// export const App = () => {
//   const { user, setUser } = useAuthStore();
//   const token = localStorage.getItem('user');
 
//   return (
//     <>
//       <CssBaseline />
//       <Container sx={{ mt: 5 }}>
//         <Routes>
//           <Route path="/" element={
//             user ? <Home /> : <Navigate to="/login" />
//           } />
//           <Route path="/login" element={
//             !user ? <Login /> : <Navigate to="/" />
//           } />
//           <Route path="/register" element={
//             !user ? <Register /> : <Navigate to="/" />
//           } />
//         </Routes>
//       </Container>
//     </>
//   );
// };
// export default App;



import {ReactNode} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/userAuthStore.ts';
import { Login } from './Pages/Login.tsx';
import { Register } from './Pages/Register.tsx';
import { Container, CssBaseline } from '@mui/material';
import { Posts } from './Pages/Posts.tsx';
import { CreatePost } from './Pages/CreatePost.tsx';
import Header from './components/Header.tsx';

const PrivateRoute = ({ element }: { element: ReactNode }) => {
  const { user } = useAuthStore();
  return user ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }: { element: ReactNode }) => {
  const { user } = useAuthStore();
  return !user ? element : <Navigate to="/" />;
};

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Posts />} />} />
          <Route path="/add-post" element={<PrivateRoute element={<CreatePost />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/register" element={<PublicRoute element={<Register />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;