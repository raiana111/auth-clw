import { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { emailSignIn } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/userAuthStore';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await emailSignIn(email, password);
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
          Вход
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
            Войти
          </Button>
          <Typography sx={{ mt: 2 }}>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};