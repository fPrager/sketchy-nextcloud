import NextcloudClient from 'nextcloud-link'

let client: NextcloudClient

const getNextcloudClient = () => {
  if (!client) {
    if (!process.env.NEXTCLOUD_URL) {
      throw new Error('missing env "NEXTCLOUD_WEBDAV_URL"')
    }

    client = new NextcloudClient({
      url: process.env.NEXTCLOUD_URL,
      username: process.env.NEXTCLOUD_USER,
      password: process.env.NEXTCLOUD_PASSWORD,
    })
  }
  return client
}

export default getNextcloudClient
