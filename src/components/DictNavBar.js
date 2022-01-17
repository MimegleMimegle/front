import React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { history } from '../redux/ConfigureStore'

export default function DictNavBar() {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: '#C4C4C4' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="밈 단어"
              value="1"
              onClick={() => {
                history.push('/dict')
              }}
              onChange={handleChange}
            />
            <Tab 
              label="Q&A" 
              value="2" 
              onClick ={()=> {
                history.push('/dict/question')
              }}
              onChange={handleChange} />
            <Tab
              label="통계"
              value="3"
              onClick={() => {
                history.push('/dict/stat')
              }}
              onChange={handleChange}
            />
            <Tab
              label="스크랩"
              value="4"
              onClick={() => {
                history.push('/dict/mymeme')
              }}
              onChange={handleChange}
            />
          </TabList>
        </Box>
        {/* <TabPanel value="1"></TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3"></TabPanel>
        <TabPanel value="4"></TabPanel> */}
      </TabContext>
    </Box>
  )
}
