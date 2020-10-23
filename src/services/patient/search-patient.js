import axios from 'axios'
import API_ROUTE from '../../apiRoute'

let tokenSource
export default async function searchPatients(value) {
  try {
    if (typeof tokenSource !== typeof undefined) {
      tokenSource.cancel('Operation canceled due to new request.')
    }

    // save the new request for cancellation
    tokenSource = axios.CancelToken.source()

    const result = await axios.get(`${API_ROUTE}/patient?name=${value}&email=${value}&address=${value}`, {
      cancelToken: tokenSource.token
    })

    return { result: result.data, cancelPrevQuery: false }
  } catch (err) {
    if (axios.isCancel(err)) return { result: null, cancelPrevQuery: true }
    return [err]
  }
}
