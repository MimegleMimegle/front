import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [view, setView] = React.useState('');

  const handleChange = (event) => {
    setView(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">보기</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={view}
          label="View"
          onChange={handleChange}
        >
          <MenuItem value={10}>전체게시글</MenuItem>
          <MenuItem value={20}>좋아요순</MenuItem>
          <MenuItem value={30}>조회순</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
