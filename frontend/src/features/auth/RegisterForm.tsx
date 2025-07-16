import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useRegisterMutation } from '../../api/authApi';

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [idNumber, setIdNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ idNumber, name, phone }).unwrap();
      onSuccess();
    } catch {}
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="subtitle1" mb={2}>הרשמה</Typography>
      <TextField
        label="תעודת זהות"
        value={idNumber}
        onChange={e => setIdNumber(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="שם מלא"
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="טלפון"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      {error && <Typography color="error" mb={1}>שגיאה בהרשמה</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
        הרשמה
      </Button>
    </Box>
  );
};

export default RegisterForm;
