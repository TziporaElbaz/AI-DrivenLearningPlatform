import React, { memo, useMemo } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';

export interface TableColumn<T> {
  id: string;
  label: string;
  render: (item: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
}

interface GenericTableProps<T> {
  data: T[] | undefined;
  columns: TableColumn<T>[];
  keyExtractor: (item: T) => string | number;
  title?: string;
  isLoading?: boolean;
  error?: any;
  emptyMessage?: string;
  showHeader?: boolean;
  stickyHeader?: boolean;
  maxHeight?: number;
  padding?: 'normal' | 'dense';
}

function GenericTable<T>({
  data,
  columns,
  keyExtractor,
  title,
  isLoading = false,
  error,
  emptyMessage = 'אין נתונים להצגה',
  showHeader = true,
  stickyHeader = false,
  maxHeight,
  padding = 'normal'
}: GenericTableProps<T>) {


  const memoizedRows = useMemo(() => {
    return data?.map((item) => (
      <TableRow key={keyExtractor(item)} hover>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align || 'left'}
            style={{ width: column.width }}
          >
            {column.render(item)}
          </TableCell>
        ))}
      </TableRow>
    ));
  }, [data, columns, keyExtractor]);


  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
          <Typography variant="body2" sx={{ ml: 2 }}>
            טוען נתונים...
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        <Alert severity="error">
          שגיאה בטעינת הנתונים
        </Alert>
      </Paper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <Typography variant="body2" color="text.secondary">
            {emptyMessage}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, overflow: 'hidden' }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      
      <Box sx={{ maxHeight, overflow: 'auto' }}>
        <Table 
          stickyHeader={stickyHeader}
          size={padding === 'dense' ? 'small' : 'medium'}
        >
          {showHeader && (
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    style={{ 
                      width: column.width,
                      fontWeight: 'bold'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          
          <TableBody>
            {memoizedRows}
          </TableBody>
        </Table>
      </Box>
      
      {/* Row count info */}
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Typography variant="caption" color="text.secondary">
          סך הכל: {data.length} רשומות
        </Typography>
      </Box>
    </Paper>
  );
}

export default memo(GenericTable) as typeof GenericTable;
