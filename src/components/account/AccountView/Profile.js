import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, makeStyles, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}))

const Profile = ({ className, ...rest }) => {
  const classes = useStyles()

  const currentState = useSelector((state) => state)

  const { currentUser } = currentState.Auth

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={currentUser.avatar_path}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {currentUser.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Actualizar foto
        </Button>
      </CardActions>
    </Card>
  )
}

Profile.propTypes = {
  className: PropTypes.string
}

export default Profile
