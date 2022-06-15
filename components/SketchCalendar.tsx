/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTheme } from '@geist-ui/core'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/SketchCalendar.module.scss'
import type { Sketch } from '../types/sketch'

type SketchCalendarProps = {
  dateFromISO: string,
  sketches: Sketch[]
}

const SketchCalendar = ({ dateFromISO, sketches }: SketchCalendarProps) => {
  const theme = useTheme()
  const noSketchDay = <div className={`${styles['no-sketch-day']} ${styles.card}`} />
  const sketchDay = (name:string, url:string) => (
    <div className={`${styles['sketch-day']} ${styles.card} ${theme.type}`}>
      <Link href={`/sketch/${name}`}>
        <a><Image alt={`sketch_${name}`} src={url} width={99} height={66} /></a>
      </Link>
    </div>
  )

  const dayMappedSketches = new Map<string, Sketch>()
  sketches.forEach((sketch) => {
    // sets fine, because no day has more than one sketch
    dayMappedSketches.set(sketch.createdAt, sketch)
  })

  const dateFrom = moment(dateFromISO)
  const dateTo = moment().endOf('month')
  const daysCnt = dateTo.diff(dateFrom, 'days')
  const dayComponents = []
  for (let i = 0; i < daysCnt; i += 1) {
    const date = dateFrom.clone().add(i, 'days')
    const dateFormat = date.format('YYYY_MM_DD')
    const sketch = dayMappedSketches.get(dateFormat)
    dayComponents.push(
      <div key={dateFormat}>
        {sketch ? sketchDay(sketch.name, sketch.shareLink) : noSketchDay}
      </div>,
    )
  }
  return (
    <div className={styles.grid}>
      { dayComponents }
    </div>
  )
}

export default SketchCalendar
