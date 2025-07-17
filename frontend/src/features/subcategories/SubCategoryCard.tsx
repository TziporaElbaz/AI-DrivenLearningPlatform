import React from 'react';
import GenericCard from '../../components/GenericCard';

interface SubCategoryCardProps {
  name: string;
  onClick: () => void;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({ name, onClick }) => (
  <GenericCard 
    title={name} 
    onClick={onClick}
    variant="clickable"
  />
);

export default SubCategoryCard;
