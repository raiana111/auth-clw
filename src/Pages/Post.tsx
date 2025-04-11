// Pages/Post.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Container, Alert } from '@mui/material';
import { useAuthStore } from '../store/userAuthStore';
import { IPost } from '../types';
import { getPostById, updatePost, deletePost } from '../api/posts/index'; // Ваш текущий импорт

export const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const [post, setPost] = useState<IPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('ID поста не указан');
        setLoading(false);
        return;
      }

      if (!user) {
        navigate('/login');
        return;
      }

      if (!profile) {
        navigate('/create-profile');
        return;
      }

      if (profile.role !== 'user') {
        setError('У вас недостаточно прав для просмотра этой страницы');
        setLoading(false);
        return;
      }

      try {
        const postData = await getPostById(id);
        if (!postData) {
          setError('Пост не найден');
          navigate('/');
          return;
        }
        setPost(postData);
        setEditContent(postData.content);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке поста');
        console.error('Fetch post error:', err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user, profile, navigate]);

  const handleEdit = async () => {
    if (!id || !editContent.trim()) {
      setError('Поле поста не может быть пустым');
      return;
    }
    try {
      await updatePost(id, editContent);
      setPost((prev) => (prev ? { ...prev, content: editContent } : null));
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Ошибка при редактировании поста');
      console.error('Edit post error:', err);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Вы уверены, что хотите удалить пост?')) return;
    try {
      await deletePost(id);
      navigate('/');
    } catch (err) {
      setError('Ошибка при удалении поста');
      console.error('Delete post error:', err);
    }
  };

  if (loading) return <Container maxWidth="md"><Typography>Загрузка...</Typography></Container>;
  if (error) return <Container maxWidth="md"><Alert severity="error">{error}</Alert></Container>;
  if (!post) return null;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Пост</Typography>
        {isEditing ? (
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              label="Редактировать пост"
              error={!!error}
              helperText={error}
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleEdit}>Сохранить</Button>
              <Button variant="outlined" onClick={() => { setIsEditing(false); setEditContent(post.content); setError(null); }}>Отмена</Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>{post.content}</Typography>
            <Typography variant="caption" color="text.secondary">
              Автор: {post.email || 'Аноним'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
              Создано: {new Date(post.createdAt).toLocaleString()}
            </Typography>
            {user?.id === post.userId && (
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>Редактировать</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Удалить</Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Post;