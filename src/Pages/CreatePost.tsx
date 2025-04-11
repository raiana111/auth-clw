// import React, { useState } from 'react';
// import { Button, TextField, Container, Box } from '@mui/material';
// import { useAuthStore } from '../store/userAuthStore.ts';
// import { createPost } from '../api/posts';
// import { Navigate } from 'react-router-dom';
// export const CreatePost = () => {
//   const [content, setContent] = useState('');
//   const { user, profile } = useAuthStore();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;

//     await createPost({
//       content,
//       userId: user.id,
//       email: user.email || '',
//       createdAt: new Date().toISOString(),
//     });
//   };

//   if (profile?.role !== "user" || !profile) {
//     return (
//       <Navigate to={'/'} />
//     );
//   }

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ mt: 4 }}>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             label="New Post"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//           <Button variant="contained" type="submit" sx={{ mt: 2 }}>
//             Create Post
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };



// Pages/CreatePost.tsx
import React, { useState } from 'react';
import { Button, TextField, Container, Box, Alert } from '@mui/material';
import { useAuthStore } from '../store/userAuthStore';
import { createPost } from '../api/posts';
import { Navigate, useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user, profile } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) {
      setError('Пожалуйста, заполните поле поста');
      return;
    }

    try {
      await createPost({
        content,
        userId: user.id,
        email: user.email || '',
        createdAt: new Date().toISOString(),
      });
      setContent('');
      navigate('/');
    } catch (err) {
      setError('Ошибка при создании поста. Попробуйте еще раз.');
      console.error('Create post error:', err);
    }
  };

  // Проверка авторизации и профиля
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!profile) {
    return <Navigate to="/create-profile" />;
  }

  // Проверка роли
  if (profile.role !== 'user') {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <h2>Создать пост</h2>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Новый пост"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            error={!!error}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit">
            Создать пост
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePost;