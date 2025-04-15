import { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { emailSignUp } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/userAuthStore';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await emailSignUp(email, password);
      setUser({ email: user.email, id: user.uid });
      navigate('/');
    } catch (error) {
      setError(`Ошибка: ${error}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center">
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Зарегистрироваться
          </Button>
          <Typography sx={{ mt: 2 }}>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};