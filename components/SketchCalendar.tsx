import moment from 'moment'
import styles from '../styles/SketchCalendar.module.css'
import type { Sketch } from '../types/sketch'

type SketchCalendarProps = {
  dateFromISO: string,
  sketches: Sketch[]
}

const SketchCalendar = ({ dateFromISO, sketches }: SketchCalendarProps) => {
  const noSketchDay = <div className={`${styles['no-sketch-day']} ${styles.card}`} />
  const sketchDay = (url:string) => (
    <div className={`${styles['sketch-day']}  ${styles.card}`} style={{ backgroundImage: `url(${url})` }} />
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
    const sketch = dayMappedSketches.get(date.format('YYYY_MM_DD'))
    dayComponents.push(
      sketch ? sketchDay(sketch.shareLink) : noSketchDay,
    )
  }
  return (
    <div className={styles.grid}>
      { dayComponents }
    </div>
  )
}

export default SketchCalendar
