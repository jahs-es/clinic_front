import React, { memo, useEffect } from 'react'
import { Box, Container, makeStyles } from '@material-ui/core'
import Page from 'src/theme/Page'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import TreatmentList from './TreatmentList'
import { fetchTreatments } from '../../../store/modules/treatment/actions/treatmentAction';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}))

const TreatmentListView = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { treatments, isLoading } = useSelector((state) => state.TratmentsState)
  const getTreatments = () => dispatch(fetchTreatments())

  useEffect(() => {
    getTreatments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Page
      className={classes.root}
      title="Tratamientos"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          { isLoading ? <CircularProgress /> : <TreatmentList treatments={treatments} />}
        </Box>
      </Container>
    </Page>
  )
}

export default memo(TreatmentListView)
