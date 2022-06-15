import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useTheme } from '@geist-ui/core'
import getSketch from '../../data-fetching/get-sketch'
import getSketches from '../../data-fetching/get-sketches'
import styles from '../../styles/Sketch.module.css'
import { Sketch } from '../../types/sketch'

type SketchViewProps = {
  sketch: Sketch
}

const SketchView = ({ sketch }: SketchViewProps) => {
  const router = useRouter()
  const theme = useTheme()

  const wrap = (component: ReactNode) => (
    <div className={styles.container} onClick={() => router.back()} role="none">
      { component }
    </div>
  )
  if (!sketch) {
    return wrap(<div>Missing Sketch</div>)
  }

  return wrap(
    <div className={`${styles.container} ${theme.type}`}>
      <img alt={`sketch from ${sketch.name}`} src={sketch.shareLink} />
    </div>,
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sketches = await getSketches()
  const paths = sketches.map(
    (sketch) => ({
      params: { name: sketch.name },
    }),
  )
  return { paths, fallback: false }
}

type Params = {
  name: string,
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params as Params
  const sketch = await getSketch(name)
  return {
    props: {
      sketch,
    },
  }
}

export default SketchView
