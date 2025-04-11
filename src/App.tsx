// import {ReactNode} from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import { useAuthStore } from './store/userAuthStore.ts';
// import { Login } from './Pages/Login.tsx';
// import { Register } from './Pages/Register.tsx';
// import { Container, CssBaseline } from '@mui/material';
// import { Posts } from './Pages/Posts.tsx';
// import { CreatePost } from './Pages/CreatePost.tsx';
// import Header from './components/Header.tsx';
// import { CreateProfile } from './Pages/CreateProfile.tsx';

// const PrivateRoute = ({ element }: { element: ReactNode }) => {
//   const { user } = useAuthStore();
//   return user ? element : <Navigate to="/login" />;
// };

// const PublicRoute = ({ element }: { element: ReactNode }) => {
//   const { user } = useAuthStore();
//   return !user ? element : <Navigate to="/" />;
// };

// export const App = () => {
//   return (
//     <>
//       <CssBaseline />
//       <Header />
//       <Container sx={{ mt: 5 }}>
//         <Routes>
//           <Route path="/" element={<PrivateRoute element={<Posts />} />} />
//           <Route path="/add-post" element={<PrivateRoute element={<CreatePost />} />} />
//           <Route path="/login" element={<PublicRoute element={<Login />} />} />
//           <Route path="/register" element={<PublicRoute element={<Register />} />} />
//           <Route path="*" element={<Navigate to="/" />} />
//           <Route path="/create-profile" element={<PrivateRoute element={<CreateProfile />} />} />
//         </Routes>
//       </Container>
//     </>
//   );
// };

// export default App;



// App.tsx
import { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/userAuthStore';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Container, CssBaseline } from '@mui/material';
import { Posts } from './Pages/Posts';
import { CreatePost } from './Pages/CreatePost';
import { Post } from './Pages/Post';
import Header from './components/Header';
import { CreateProfile } from './Pages/CreateProfile';

const PrivateRoute = ({ element }: { element: ReactNode }) => {
  const { user, profile } = useAuthStore();
  console.log('PrivateRoute - User:', user, 'Profile:', profile); // Для отладки
  if (!user) {
    console.log('Redirecting to /login: No user');
    return <Navigate to="/login" />;
  }
  if (!profile && window.location.pathname !== '/create-profile') {
    console.log('Redirecting to /create-profile: No profile');
    return <Navigate to="/create-profile" />;
  }
  return element;
};

const PublicRoute = ({ element }: { element: ReactNode }) => {
  const { user } = useAuthStore();
  console.log('PublicRoute - User:', user); // Для отладки
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
          <Route path="/post/:id" element={<PrivateRoute element={<Post />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/register" element={<PublicRoute element={<Register />} />} />
          <Route path="/create-profile" element={<PrivateRoute element={<CreateProfile />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;