import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';


export default function MySnackBar({open, message}) {



  const action = (
    <React.Fragment>
    
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Stack spacing={2} sx={{width:'100%'}}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
      >
          <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      </Stack>
    </div>
  );
}