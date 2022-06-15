import getSketches from './get-sketches'

const getSketch = async (name: string) => {
  const allSketches = await getSketches()
  return allSketches.find((s) => s.name === name)
}

export default getSketch
