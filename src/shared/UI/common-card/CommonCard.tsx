import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './CommonCard.module.css';
import Container from '@mui/material/Container';
import type { TDataInfo } from '../../utils/commonTypes';

type TCommonCardProps = {
  title: string;
  content: TDataInfo;
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
        {content.data.map((filed, index) => {
          const key = filed.key ?? String(index);
          return (
            <Container
              style={{
                display: 'flex',
                flexDirection: row ? 'row' : 'column',
                gap: row ? '20px' : '0'
              }}
              key={key}
            >
              <Typography
                variant='h6'
                sx={{ color: 'text.primary', fontSize: 18, lineHeight: '36px' }}
              >
                {filed.fieldLabel}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'text.primary', fontSize: 16, lineHeight: '36px' }}
              >
                {String(filed.fieldValue ?? '')}
              </Typography>
            </Container>
          );
        })}
      </CardContent>
      <div className={styles.action_buttons}>{children}</div>
    </Card>
  );
};
