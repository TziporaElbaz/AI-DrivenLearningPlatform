import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

interface CategoryFormModalProps {
  mode: 'add' | 'edit';
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialValue?: string;
  loading?: boolean;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  mode,
  open,
  onClose,
  onSubmit,
  initialValue = '',
  loading = false
}) => {
  const [name, setName] = useState(initialValue);

  // עדכון הערך כשנפתח מודאל עריכה
  useEffect(() => {
    setName(initialValue);
  }, [initialValue, open]);

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === 'add' ? 'הוסף קטגוריה חדשה' : 'ערוך קטגוריה'}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="שם הקטגוריה"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2 }}
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          ביטול
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!name.trim() || loading}
        >
          {mode === 'add' ? 'הוסף' : 'עדכן'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryFormModal;
