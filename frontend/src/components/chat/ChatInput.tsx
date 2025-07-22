import React, { memo, useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Stack,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
  error?: any;
  placeholder?: string;
}
const ChatInput: React.FC<ChatInputProps> = memo(({ 
  onSendMessage, 
  isLoading = false, 
  error,
  placeholder = "כתוב הודעה..."
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return;
    
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Stack spacing={2}>
      {error && (
        <Alert severity="error">
          אירעה שגיאה בשליחת ההודעה
        </Alert>
      )}

      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={isLoading}
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            sx={{ minWidth: 'auto', px: 2 }}
          >
            <SendIcon />
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;
