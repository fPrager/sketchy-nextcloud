import moment, { Moment } from 'moment'
import type NextcloudClient from 'nextcloud-link'

type FileCache<T> = {
  createdAt?: Moment,
  content?: T,
}

type UpdatableFileCache<T> = FileCache<T> & {
  update: (newContent: T) => Promise<void>,
}

const getFileCache = async <T>(client: NextcloudClient, fileUrl: string)
: Promise<UpdatableFileCache<T>> => {
  const update = async (newContent: T) => {
    const cache: FileCache<T> = {
      createdAt: moment(),
      content: newContent,
    }
    const data = JSON.stringify(cache)
    return client.put(fileUrl, data)
  }

  const invalidCache = {
    content: undefined,
    update,
  }
  const exists = await client.exists(fileUrl)
  if (!exists) {
    return invalidCache
  }

  // const stream = await client.getReadStream(fileCacheUrl)
  let fileCache: FileCache<T>
  try {
    const data = await client.get(fileUrl)
    fileCache = JSON.parse(data)
  } catch (e) {
    console.error(e)
    return invalidCache
  }

  const isOutOfDate = moment(fileCache.createdAt).isBefore(moment().subtract(24, 'hours'))
  if (isOutOfDate) {
    return invalidCache
  }

  return {
    ...fileCache,
    update,
  }
}

export default getFileCache
