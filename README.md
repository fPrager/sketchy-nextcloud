This is a nextjs-project to display daily imgages(sketches) stored on a [**nextcloud**](https://nextcloud.com/) server.  

## Setup

### Image Source

A folder on nextcloud that contains only **png**-images following this name convention: ```[year]_[month]_[day].png```

The content of the folder could look like:
```
sketches/
   2022_02_26.png
```

The date of the file name is the date of you created the image.

#### What kind of images?
The style of the page is designed for **3/4 black-white images** (like simple pen sketches). 


### Nextcloud Config
Add the following credentials of nextcloud to the nextjs environment (```.env.local``` for local development or [Environment Settings](https://nextjs.org/docs/basic-features/environment-variables) if hosted at Vercel)

```
NEXTCLOUD_HOST=my-personal-nextcloud.com
NEXTCLOUD_URL=https://my-personal-nextcloud.com
NEXTCLOUD_USER=fancy-artist
NEXTCLOUD_PASSWORD="may_password_with_escape_chars_like_\$"

```

### Install Dependencies

First, run the development server:

```bash
npm install
# or
yarn install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
