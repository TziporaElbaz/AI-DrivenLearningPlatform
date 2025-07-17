import React from 'react';
import GenericCard from '../../components/GenericCard';

interface CategoryCardProps {
  name: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, onClick }) => (
  <GenericCard 
    title={name} 
    onClick={onClick}
    variant="clickable"
  />
);

export default CategoryCard;
