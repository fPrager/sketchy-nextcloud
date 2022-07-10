import styles from '../styles/MonthNameLink.module.scss'

type MonthNameLinkProps = {
  sectionId: string,
  name: string,
  onClick: (sectionId: string) => void,
}

const MonthNameLink = ({ sectionId, name, onClick }: MonthNameLinkProps) => (
  <div
    onClick={() => onClick(sectionId)}
    className={styles.name}
    role="link"
    tabIndex={0}
    aria-hidden="true"
  >
    {name}
  </div>
)

export default MonthNameLink
