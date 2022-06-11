import moment from 'moment'
import type { Sketch } from '../types/sketch'
import toNotEmptyList from '../utils/to-not-empty'
import Config from './config.json'
import getNextcloudClient from './get-nextcloud-client'
import getShareLink from './get-share-link'
import MockedSketches from './MockedSketches'

const chunkRequests = <T>(requests: T[], chunkSize = 10) :T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < requests.length; i += chunkSize) {
    const chunk = requests.slice(i, i + chunkSize)
    chunks.push(
      chunk,
    )
  }
  return chunks
}

const getSketch = async (fileName: string): Promise<Sketch | null> => {
  const name = fileName.split('.')[0]
  const createdAt = moment(name, 'YYYY_MM_DD')
  if (!createdAt.isValid()) {
    return null
  }

  const shareLink = await getShareLink(fileName)
  if (!shareLink) {
    return null
  }

  return {
    name,
    createdAt,
    shareLink,
  }
}

const getSketches = async (): Promise<Sketch[]> => {
  if (process.env.NODE_ENV === 'development') {
    return MockedSketches
  }

  const client = getNextcloudClient()
  const directoryItems = await client.getFiles(Config.SketchRoot)
  const requestChunks = chunkRequests(directoryItems)

  const sketches: Sketch[] = []
  for (let i = 0; i < requestChunks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const requestedSketches = await Promise.all(requestChunks[i].map((file) => getSketch(file)))
    const existingSketches: Sketch[] = toNotEmptyList(requestedSketches)
    sketches.push(...existingSketches)
  }

  return sketches
}

export default getSketches
