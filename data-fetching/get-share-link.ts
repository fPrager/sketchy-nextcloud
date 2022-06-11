import Config from './config.json'
import getNextcloudClient from './get-nextcloud-client'

const getShareLink = async (fileName: string) => {
  const client = getNextcloudClient()
  const filePath = `${Config.SketchRoot}/${fileName}`
  const shareLinks = await client.shares.list(filePath)
  let shareLink = shareLinks.find((link) => !!link.url && !link.expiration)

  if (!shareLink) {
    shareLink = await client.shares.add(filePath, 3)
  }

  return shareLink.url || null
}

export default getShareLink
