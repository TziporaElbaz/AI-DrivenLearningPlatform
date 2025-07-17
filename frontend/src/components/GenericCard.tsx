import React from 'react';
import { Card, CardContent, Typography, SxProps, Theme } from '@mui/material';

interface GenericCardProps {
  title: string;
  subtitle?: string;
  onClick?: () => void;
  variant?: 'clickable' | 'static';
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const GenericCard: React.FC<GenericCardProps> = ({
  title,
  subtitle,
  onClick,
  variant = 'clickable',
  children,
  sx,
}) => {
  const getVariantStyles = () => {
    if (variant === 'clickable') {
      return {
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
          boxShadow: 8,
          transform: 'scale(1.03)',
        },
      };
    }
    return {};
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        ...getVariantStyles(),
        ...sx,
      }}
      onClick={onClick}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        {children}
        <Typography variant="h6" color="text.primary" align="center">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default GenericCard;
