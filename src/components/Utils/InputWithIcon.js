import * as React from 'react';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';



export default function InputWithIcon(props) {
  const {label, icon} = props
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        id="input-with-icon-textfield"
        label={label}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             {icon}
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </Box>
  );
}
