import { useState } from 'react';
import { Button, TextField, Container, Box, Alert, Typography } from '@mui/material';
import { useAuthStore } from '../store/userAuthStore';
import { createPost } from '../api/posts';
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
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
      setError('Ошибка при создании поста');
      console.error('Ошибка создания поста:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Создать пост
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
            Создать
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePost;