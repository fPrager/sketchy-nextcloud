import { ScrollArea } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import moment from 'moment'
import { useRouter } from 'next/router'
import {
  ForwardedRef,
  useEffect, useMemo, useRef,
} from 'react'
import styles from '../styles/SketchCalendar.module.scss'
import type { Sketch } from '../types/sketch'
import chunk from '../utils/chunk'
import FramedSketch from './FramedSketch'
import MonthNameLink from './MonthNameLink'

type SketchyMonth = {
  name: string,
  sketches: (Sketch | null)[],
}

type SketchyYear = {
  name: string,
  months: SketchyMonth[],
}

type SketchCalendarProps = {
  dateFromISO: string,
  sketches: Sketch[]
}

const getSketchyYears = (sketches: Sketch[], dateFromISO: string): SketchyYear[] => {
  const dateFrom = moment(dateFromISO)
  const dateTo = moment().endOf('month')
  const daysCnt = dateTo.diff(dateFrom, 'days')

  const dayMappedSketches = new Map<string, Sketch>()
  sketches.forEach((sketch) => {
    // set is fine, because no day has more than one sketch
    dayMappedSketches.set(sketch.createdAt, sketch)
  })

  const result: SketchyYear[] = []
  let lastYear: SketchyYear | null = null
  let lastMonth: SketchyMonth | null = null

  for (let i = 0; i < daysCnt; i += 1) {
    const date = dateFrom.clone().add(i, 'days')
    const dateFormat = date.format('YYYY_MM_DD')
    const yearFormat = date.format('YYYY')
    const monthFormat = date.format('MMMM')

    if (lastYear === null || lastYear.name !== yearFormat) {
      lastMonth = {
        name: monthFormat,
        sketches: [],
      }
      lastYear = {
        name: yearFormat,
        months: [lastMonth],
      }
      result.push(lastYear)
    }

    if (lastMonth === null || lastMonth.name !== monthFormat) {
      lastMonth = {
        name: monthFormat,
        sketches: [],
      }
      lastYear.months.push(lastMonth)
    }

    const sketch = dayMappedSketches.get(dateFormat) || null
    lastMonth?.sketches?.push(sketch)
  }

  return result
}

const SketchCalendar = ({ dateFromISO, sketches }: SketchCalendarProps) => {
  const router = useRouter()
  const viewport = useRef<HTMLDivElement>()
  const clipboard = useClipboard()

  const scrollToMonth = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element || !viewport.current) return
    viewport.current.scrollTo({ left: element.offsetLeft, behavior: 'smooth' })
  }

  const shareMonth = (sectionId: string) => {
    const shareLink = `${window.location.origin}${router.pathname}?month=${sectionId}`
    router.replace(shareLink, shareLink)
    clipboard.copy(shareLink)
  }

  useEffect(() => {
    const params = (new URL(`${window.location}`)).searchParams
    const requestedMonth = params.get('month')
    if (requestedMonth) {
      scrollToMonth(requestedMonth)
    }
  }, [])

  const noSketchDay = <div className={`${styles['no-sketch-day']} ${styles.card}`} />
  const sketchDay = (name:string, url:string) => (
    <FramedSketch url={url} name={name} />
  )

  const sketchyYears: SketchyYear[] = useMemo(
    () => getSketchyYears(sketches, dateFromISO),
    [sketches.length],
  )

  const yearComponents = sketchyYears.map((year) => {
    const monthComponents = year.months.map((month) => {
      const dayComponents = month.sketches.map((sketch) => (
        sketch ? sketchDay(sketch.name, sketch.shareLink) : noSketchDay
      ))

      const weeksComponents = chunk(dayComponents, 7).map((week) => (
        <div className={styles.week}>
          { week }
        </div>
      ))

      const sectionId = `${year.name}-${month.name}`
      const handleOnClick = () => {
        scrollToMonth(sectionId)
        shareMonth(sectionId)
      }

      return (
        <section className={styles.month} id={sectionId}>
          <div className={styles.title}>
            <MonthNameLink sectionId={sectionId} name={month.name} onClick={handleOnClick} />
          </div>
          <div className={styles.weeks}>
            { weeksComponents }
          </div>
        </section>
      )
    })

    return (
      <div className={styles.year}>
        <div className={styles.title}>{year.name}</div>
        <div className={styles.months}>
          { monthComponents }
        </div>
      </div>
    )
  })

  return (
    <div className={styles.calendar}>
      <ScrollArea
        className={styles.scroll}
        viewportRef={viewport as ForwardedRef<HTMLDivElement> | undefined}
      >
        <div className={styles.grid}>
          { yearComponents }
        </div>
      </ScrollArea>
    </div>
  )
}

export default SketchCalendar
