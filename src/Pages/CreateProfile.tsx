import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../api/users';
import { IProfile } from '../types';
import { useAuthStore } from '../store/userAuthStore';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

export const CreateProfile = () => {
  const navigate = useNavigate();
  const { user, setProfile } = useAuthStore();
  const [formData, setFormData] = useState<Omit<IProfile, 'id' | 'userId'>>({
    name: '',
    lastName: '',
    role: 'user',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Пользователь не авторизован');
      return;
    }
    try {
      const profileData = { ...formData, userId: user.id };
      await setUser(user.id, profileData);
      setProfile({ ...profileData, id: user.id });
      navigate('/');
    } catch {
      setError('Ошибка при создании профиля');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    setFormData((prev) => ({ ...prev, role: e.target.value }));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Создание профиля
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Имя"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Фамилия"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Роль</InputLabel>
            <Select
              name="role"
              value={formData.role}
              label="Роль"
              onChange={handleSelectChange}
            >
              <MenuItem value="user">Администратор</MenuItem>
              <MenuItem value="admin">Пользователь</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={() => navigate('/')}>
              Отмена
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Создать
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateProfile;