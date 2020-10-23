import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Box, Card, CardContent, InputAdornment, makeStyles, SvgIcon, TextField } from '@material-ui/core'
import { Search as SearchIcon } from 'react-feather'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { AddCircleOutline } from '@material-ui/icons'
import DialogForm from '../../common/DialogForm'
import { fetchTreatments } from '../../../store/modules/treatment/actions/treatmentAction'
import TreatmentDetail from '../TreatmentDetail'

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}))

const emptyTreatment = {
  name: '',
  active: true
}

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState({})

  const getTreatments = (value) => dispatch(fetchTreatments(value))

  const sendQuery = async (value) => {
    getTreatments(value)
  }

  const onChange = ({ target: { value } }) => {
    setQuery(value)

    const search = _.debounce(sendQuery, 300)

    setSearchQuery((prevSearch) => {
      if (prevSearch.cancel) {
        prevSearch.cancel()
      }
      return search
    })
    search(value)
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <DialogForm
          row={emptyTreatment}
          icon={<AddCircleOutline />}
          formToShow={<TreatmentDetail />}
        />
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Teclee para buscar ..."
                variant="outlined"
                onChange={onChange}
                value={query}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

Toolbar.propTypes = {
  className: PropTypes.string
}

export default Toolbar
