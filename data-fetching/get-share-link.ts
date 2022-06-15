import type NextcloudClient from 'nextcloud-link'

const getShareLink = async (client: NextcloudClient, fileUrl: string) => {
  const shareLinks = await client.shares.list(fileUrl)
  let shareLink = shareLinks.find((link) => !!link.url && !link.expiration)

  if (!shareLink) {
    shareLink = await client.shares.add(fileUrl, 3)
  }

  return `${shareLink.url}/preview` || null
}

export default getShareLink
