import React, { memo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = memo(({ message }) => {
  const isUser = message.type === 'user';
  
  return (
    <Card
      sx={{
        maxWidth: '70%',
        bgcolor: isUser ? 'primary.main' : 'grey.100',
        color: isUser ? 'white' : 'text.primary',
        alignSelf: isUser ? 'flex-end' : 'flex-start'
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          {isUser ? (
            <PersonIcon sx={{ fontSize: 20, mt: 0.5 }} />
          ) : (
            <SmartToyIcon sx={{ fontSize: 20, mt: 0.5 }} />
          )}
          <Stack spacing={1} flex={1}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {message.content}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                opacity: 0.7,
                alignSelf: 'flex-end'
              }}
            >
              {message.timestamp.toLocaleTimeString('he-IL')}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
});

Message.displayName = 'Message';

export default Message;
