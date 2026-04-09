import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CommonButton } from '../../shared/ui/common-button/CommonButton';
import { useNavigate } from 'react-router';
import { routes } from '../../app/routes';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <AppBar position='static'>
        <Toolbar sx={{ display: 'flex', gap: '30px' }}>
          <Typography variant='h6'>Corporate Approval</Typography>
          <CommonButton color='secondary' onClick={() => navigate(routes.main)}>
            Home
          </CommonButton>
          <CommonButton
            color='secondary'
            onClick={() => navigate(routes.newCompany)}
          >
            New Company
          </CommonButton>
        </Toolbar>
      </AppBar>
    </header>
  );
};
