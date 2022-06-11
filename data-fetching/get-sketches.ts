import { Sketch } from '../types/sketch'
import getFileCache from './get-file-cache'
import getNextcloudClient from './get-nextcloud-client'
import getUpdatedSketches from './get-updated-sketches'
import MockedSketches from './MockedSketches'
import Config from './config.json'

const getSketches = async () => {
  if (process.env.NODE_ENV === 'development') {
    return MockedSketches
  }
  const client = getNextcloudClient()
  const cache = await getFileCache<Sketch[]>(client, `${Config.SketchRoot}/${Config.CacheFileName}`)
  if (cache.content) {
    return cache.content
  }

  const sketches = await getUpdatedSketches(client)
  await cache.update(sketches)
  return sketches
}

export default getSketches
