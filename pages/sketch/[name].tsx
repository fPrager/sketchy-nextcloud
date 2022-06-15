import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import getSketch from '../../data-fetching/get-sketch'
import getSketches from '../../data-fetching/get-sketches'
import styles from '../../styles/Sketch.module.css'
import { Sketch } from '../../types/sketch'

type SketchViewProps = {
  sketch: Sketch
}

const SketchView = ({ sketch }: SketchViewProps) => {
  const router = useRouter()

  const wrap = (component: ReactNode) => (
    <div className={styles.container} onClick={() => router.back()} role="none">
      { component }
    </div>
  )
  if (!sketch) {
    return wrap(<div>Missing Sketch</div>)
  }

  return wrap(
    <div className={styles.container}>
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
