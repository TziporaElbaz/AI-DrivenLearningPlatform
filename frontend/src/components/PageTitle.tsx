// components/PageTitle.tsx
import React from 'react';
import { Typography } from '@mui/material';

interface PageTitleProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: string;
  centered?: boolean;
}

const PageTitle: React.FC<PageTitleProps> = ({ 
  children, 
  variant = "h5", 
  color = "secondary",
  centered = true 
}) => (
  <Typography 
    variant={variant} 
    color={color} 
    sx={{ 
      mb: 3, 
      textAlign: centered ? 'center' : 'left', 
      fontWeight: 500 
    }}
  >
    {children}
  </Typography>
);

export default PageTitle;