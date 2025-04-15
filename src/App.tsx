import { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/userAuthStore';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Container, CssBaseline } from '@mui/material';
import { Posts } from './Pages/Posts';
import { Post } from './Pages/Post';
import { CreatePost } from './Pages/CreatePost';
import { CreateProfile } from './Pages/CreateProfile';
import Header from './components/Header';

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
          <Route path="/post/:id" element={<PrivateRoute element={<Post />} />} />
          <Route path="/create-profile" element={<PrivateRoute element={<CreateProfile />} />} />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/register" element={<PublicRoute element={<Register />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;