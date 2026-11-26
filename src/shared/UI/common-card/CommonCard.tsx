import { Fragment } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { type SxProps, type Theme } from '@mui/system';
import type { TDataInfo } from '../../utils/commonTypes';
import styles from './CommonCard.module.css';

type TCommonCardProps = {
  title: string;
  content: TDataInfo;
  children?: React.ReactNode;
  horizontal?: boolean;
  sx?: SxProps<Theme>;
};

export const CommonCard = ({
  title,
  content,
  children,
  horizontal = false,
  sx
}: TCommonCardProps) => {
  return (
    <Card
      sx={[
        {
          minWidth: 300,
          height: '100%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column'
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      <CardContent
        sx={{
          margin: 0,
          padding: 0,
          display: 'grid',
          gridTemplateColumns: horizontal ? 'max-content 1fr' : '1fr',
          rowGap: '10px',
          columnGap: horizontal ? '10px' : 0,
          alignItems: 'baseline'
        }}
      >
        <Typography
          variant='h3'
          gutterBottom
          sx={{
            color: 'text.secondary',
            fontSize: 16,
            gridColumn: horizontal ? '1 / -1' : undefined
          }}
        >
          {title}
        </Typography>
        {content.data.map((field, index) => {
          const key = field.key ?? String(index);
          return (
            <Fragment key={key}>
              <Typography
                variant='h6'
                sx={{ color: 'text.primary', fontSize: 18 }}
              >
                {field.fieldLabel}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'text.primary', fontSize: 16 }}
              >
                {String(field.fieldValue ?? '')}
              </Typography>
            </Fragment>
          );
        })}
      </CardContent>
      <div className={styles.children}>{children}</div>
    </Card>
  );
};
