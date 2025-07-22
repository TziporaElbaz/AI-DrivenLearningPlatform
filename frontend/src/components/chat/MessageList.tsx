import React, { memo, useRef, useEffect } from 'react';
import {
  Stack,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Message, { Message as MessageType } from './Message';

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
}

const MessageList: React.FC<MessageListProps> = memo(({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Stack spacing={2} sx={{ flex: 1, overflow: 'auto', p: 2 }}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
 
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Card sx={{ bgcolor: 'grey.100' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <SmartToyIcon sx={{ fontSize: 20 }} />
                <CircularProgress size={16} />
                <Typography variant="body2">חושב...</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      <div ref={messagesEndRef} />
    </Stack>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
