import React, { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Avatar, Box, Divider, Drawer, List, makeStyles, Typography } from '@material-ui/core'
import { BarChart as BarChartIcon, User as UserIcon } from 'react-feather'
import { useSelector } from 'react-redux'
import { Face, FilterFrames } from '@material-ui/icons'
import NavItem from './NavItem'

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Inicio'
  },
  {
    href: '/app/patients',
    icon: Face,
    title: 'Pacientes'
  },
  {
    href: '/app/treatments',
    icon: FilterFrames,
    title: 'Tratamientos'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Cuenta'
  }
]

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}))

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles()
  const location = useLocation()

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const currentState = useSelector((state) => state)

  const { currentUser } = currentState.Auth

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={currentUser.avatar_path}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {currentUser.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {currentUser.email}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  )

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.mobileDrawer }}
      onClose={onMobileClose}
      open={openMobile}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
}

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
}

export default NavBar
