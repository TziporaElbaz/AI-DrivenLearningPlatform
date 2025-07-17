import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';

interface StatisticsCardsProps {
  categoriesCount: number;
  usersCount?: number;
  chatsCount?: number;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  categoriesCount,
  usersCount,
  chatsCount
}) => {
  return (
    <Box 
      display="flex" 
      flexWrap="wrap" 
      gap={3} 
      sx={{ mb: 4 }}
    >
      <Card sx={{ flex: '1 1 250px', minWidth: 250 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h6">משתמשים</Typography>
          <Typography variant="h4" color="primary">
            {usersCount || '-'}
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ flex: '1 1 250px', minWidth: 250 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <CategoryIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
          <Typography variant="h6">קטגוריות</Typography>
          <Typography variant="h4" color="secondary">
            {categoriesCount}
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ flex: '1 1 250px', minWidth: 250 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <AnalyticsIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
          <Typography variant="h6">שיחות</Typography>
          <Typography variant="h4" color="success.main">
            {chatsCount || '-'}
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ flex: '1 1 250px', minWidth: 250 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <SettingsIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
          <Typography variant="h6">מערכת</Typography>
          <Chip label="פעיל" color="success" />
        </CardContent>
      </Card>
    </Box>
  );
};

export default StatisticsCards;
