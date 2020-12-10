import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {}
}))

const SearchCombo = ({ className, searchFunction, searchAction, emptyElement, ...rest }) => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0
  const classes = useStyles()
  const dispatch = useDispatch()

  const onChangeHandle = async (value) => {
    const { result, cancelPrevQuery } = await searchFunction(value)

    if (cancelPrevQuery) {
      console.log('cancelPrevQuery is sent')
      return
    }

    if (result !== undefined) {
      setOptions(result)
    }
  }

  const onPatientSelected = (selectedPatient) => {
    dispatch(searchAction(selectedPatient || emptyElement))
    setOpen(false)
  }

  const search = _.debounce(onChangeHandle, 300)

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const inputStyle = { WebkitBoxShadow: '0 0 0 1000px white inset' }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Autocomplete
        selectOnFocus
        id="search-patient"
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        onChange={(event, value) => onPatientSelected(value)}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Teclee para buscar ..."
            variant="outlined"
            onChange={(ev) => {
              if (ev.target.value !== '' || ev.target.value !== null) {
                search(ev.target.value)
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
              style: inputStyle
            }}
          />
        )}
      />
    </div>
  )
}

SearchCombo.propTypes = {
  className: PropTypes.string,
  searchFunction: PropTypes.func.isRequired,
  searchAction: PropTypes.func.isRequired,
  emptyElement: PropTypes.object.isRequired
}

export default SearchCombo
