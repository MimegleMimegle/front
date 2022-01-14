import React from 'react'
import { history } from '../redux/ConfigureStore'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import FavoriteIcon from '@mui/icons-material/Favorite'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import SummarizeIcon from '@mui/icons-material/Summarize'

export default function DictNavBar() {
  const [value, setValue] = React.useState(0)

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          label="LIST"
          icon={<SummarizeIcon />}
          onClick={() => {
            history.push('/dict')
          }}
        />
        <BottomNavigationAction
          label="RANKING"
          icon={<MilitaryTechIcon />}
          onClick={() => {
            history.push('/dict/stat')
          }}
        />
        <BottomNavigationAction
          label="Q&A"
          icon={<QuestionAnswerIcon />}
          onClick={() => {
            history.push('/dict')
          }}
        />
        <BottomNavigationAction
          label="MY DICT"
          icon={<FavoriteIcon />}
          onClick={() => {
            history.push('/Dict/MyMeMe')
          }}
        />
      </BottomNavigation>
    </Box>
  )
}
