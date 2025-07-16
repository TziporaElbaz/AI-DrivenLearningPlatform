import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CategoryCardProps {
  name: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, onClick }) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: 3,
      cursor: 'pointer',
      transition: '0.2s',
      '&:hover': { boxShadow: 8, transform: 'scale(1.03)' },
    }}
    onClick={onClick}
  >
    <CardContent>
      <Typography variant="h6" color="text.primary" align="center">
        {name}
      </Typography>
    </CardContent>
  </Card>
);

export default CategoryCard;
