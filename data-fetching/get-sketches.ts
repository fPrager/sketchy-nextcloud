import getNextcloudClient from './get-nextcloud-client'
import getUpdatedSketches from './get-updated-sketches'
import MockedSketches from './MockedSketches'

const getSketches = async () => {
  if (process.env.NODE_ENV === 'development') {
    return MockedSketches
  }
  const client = getNextcloudClient()
  return getUpdatedSketches(client)
}

export default getSketches
