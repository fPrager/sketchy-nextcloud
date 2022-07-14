import type { NextPage } from 'next'
import SketchCalendar from '../components/SketchCalendar'
import getSketches from '../data-fetching/get-sketches'
import { Sketch } from '../types/sketch'

type HomeProps = {
  sketches: Sketch[],
}

const Home: NextPage<HomeProps> = ({ sketches }) => (
  <SketchCalendar dateFromISO="2021-12-31T23:00:00.000Z" sketches={sketches} />
)

export async function getStaticProps() {
  const sketches = await getSketches()
  return {
    props: {
      sketches,
    },
    revalidate: 86400,
  }
}

export default Home
