import { Grid, Toggle } from '@geist-ui/core'
import { Sun } from '@geist-ui/icons'

export const DEFAULT_THEME = 'light'

type ThemeSelectPropsType = {
  onSelect: (value: string) => void,
  defaultValue: string,
}

const ThemeSelect = ({ onSelect, defaultValue }: ThemeSelectPropsType) => (
  <Grid.Container justify="flex-end" gap={1}>
    <Grid alignItems="flex-start" alignContent="center" justify="center" style={{ height: '100%' }}>
      <Toggle
        type="secondary"
        onChange={((event) => onSelect(event.target.checked ? 'light' : 'dark'))}
        initialChecked={defaultValue === 'light'}
        style={{ height: '100%' }}
      />
    </Grid>
    <Grid>
      <Sun />
    </Grid>
  </Grid.Container>
)

export default ThemeSelect
