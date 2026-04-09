import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Footer = () => {
  return (
    <footer>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', gap: '30px' }}>
          <Typography
            variant='h6'
            sx={{
              margin: '0 auto'
            }}
          >
            Corporate Approval
          </Typography>
        </Toolbar>
      </AppBar>
    </footer>
  );
};
