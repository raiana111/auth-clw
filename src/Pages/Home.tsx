import {useAuthStore} from '../store/userAuthStore.ts';
import {Button, Typography} from '@mui/material';
import {userSignOut} from '../firebase.ts';
import {Link} from 'react-router-dom';

export const Home = () => {
  const { user , clearUser} = useAuthStore();
  if (user) {
    return <div>
      <Typography variant="body2" >Email:{user.email}</Typography>
      <Typography variant="body2" >ID:{user.id}</Typography>
      <div>
        <Button onClick={() => {
          userSignOut()
          clearUser();
        }}>LOG OUT</Button>
      </div>
    </div>
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      <Link color="inherit" to="/login">Login</Link>
      <Link color="inherit" to="/register">Register</Link>
    </div>
  );
};
