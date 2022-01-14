import React from 'react'
import Stack from '@mui/material/Stack'
import Badge from '@mui/material/Badge'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

export default function NotificationButton() {
  return (
    <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
      <Badge color="secondary" badgeContent={0} showZero>
        <NotificationsActiveIcon />
      </Badge>
    </Stack>
  )
}
