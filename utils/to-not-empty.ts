// ref: https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array

export const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue => {
  if (value === null || value === undefined) return false
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const testDummy: TValue = value
  return true
}

const toNotEmptyList = <TValue>(list: (TValue | null | undefined)[]) => list.filter(notEmpty)
export default toNotEmptyList
