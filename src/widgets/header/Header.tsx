import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CommonButton } from '../../shared/ui/common-button/CommonButton';
import { useNavigate } from 'react-router';
import { routeBuilders } from '../../app/routes';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar component='header' position='static' role='banner'>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Corporate Approval
        </Typography>
        <CommonButton
          color='secondary'
          onClick={() => navigate(routeBuilders.main())}
        >
          Home
        </CommonButton>
        <CommonButton
          color='secondary'
          onClick={() => navigate(routeBuilders.newCompany())}
        >
          New Company
        </CommonButton>
      </Toolbar>
    </AppBar>
  );
};
