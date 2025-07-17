import React from 'react';
import { Typography, Box, SxProps, Theme } from '@mui/material';
import GenericCard from './GenericCard';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number | React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
  sx?: SxProps<Theme>;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  color = 'primary',
  sx,
}) => {
  return (
    <GenericCard
      title=""
      variant="static"
      sx={{
        flex: '1 1 250px',
        minWidth: 250,
        ...sx,
      }}
    >
      {icon}
      <Typography variant="h6" sx={{ mt: 1 }}>
        {title}
      </Typography>
      {typeof value === 'string' || typeof value === 'number' ? (
        <Typography variant="h4" color={color} sx={{ mt: 1 }}>
          {value}
        </Typography>
      ) : (
        <Box sx={{ mt: 1 }}>{value}</Box>
      )}
    </GenericCard>
  );
};

export default StatCard;
