/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTheme } from '@geist-ui/core'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/FramedSketch.module.scss'

type FramedSketchProps = {
  url: string,
  name: string,
}

const FramedSketch = ({ url, name }: FramedSketchProps) => {
  const theme = useTheme()
  return (
    <Link href={`/sketch/${name}`}>
      <a>
        <div className={`${styles.container} ${theme.type}`}>
          <div className={styles.shadow} />
          <div className={styles.sketch}><Image alt={`sketch_${name}`} src={url} width={99} height={66} /></div>
          <div className={styles.frame}><Image alt={`frame_${name}`} src="/images/frame.png" width={400} height={300} /></div>
        </div>
      </a>
    </Link>
  )
}

export default FramedSketch
