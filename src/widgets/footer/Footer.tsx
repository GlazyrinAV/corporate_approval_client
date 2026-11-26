import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Footer = () => {
  return (
    <AppBar component='footer' position='static'>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant='h6' color='text.secondary'>
          Corporate Approval
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
