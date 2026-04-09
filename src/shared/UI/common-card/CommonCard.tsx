import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './CommonCard.module.css';
import Container from '@mui/material/Container';

type TCommonCardContent = {
  [key: string]: string;
};

type TCommonCardProps = {
  title: string;
  content: TCommonCardContent;
  children?: React.ReactNode;
  row?: boolean;
};

export const CommonCard = ({
  title,
  content,
  children,
  row = false
}: TCommonCardProps) => {
  return (
    <Card
      sx={{
        minWidth: 300,
        height: '100%',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
      }}
    >
      <CardContent
        sx={{ margin: '0', padding: '0', '&:last-child': { paddingBottom: 0 } }}
      >
        <Typography
          variant='h3'
          gutterBottom
          sx={{ color: 'text.secondary', fontSize: 16 }}
        >
          {title}
        </Typography>
        {Object.entries(content).map(([key, value], index) => {
          return (
            <Container
              style={{
                display: 'flex',
                flexDirection: row ? 'row' : 'column',
                gap: row ? '20px' : '0'
              }}
              key={index}
            >
              <Typography
                variant='h6'
                sx={{ color: 'text.primary', fontSize: 18, lineHeight: '36px' }}
              >
                {key}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'text.primary', fontSize: 16, lineHeight: '36px' }}
              >
                {value}
              </Typography>
            </Container>
          );
        })}
      </CardContent>
      <div className={styles.action_buttons}>{children}</div>
    </Card>
  );
};
