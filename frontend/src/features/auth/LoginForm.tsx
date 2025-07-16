import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useLoginMutation } from '../../api/authApi';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [idNumber, setIdNumber] = React.useState('');
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ idNumber }).unwrap();
      onSuccess();
    } catch {}
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="subtitle1" mb={2}>התחברות</Typography>
      <TextField
        label="תעודת זהות"
        value={idNumber}
        onChange={e => setIdNumber(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      {error && <Typography color="error" mb={1}>שגיאה בהתחברות</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
        התחבר
      </Button>
    </Box>
  );
};

export default LoginForm;
