import { Grid, Themes, Toggle } from '@geist-ui/core'
import { Sun } from '@geist-ui/icons'

export const DEFAULT_THEME = 'my-light'

export const myLightTheme = Themes.createFromLight({
  type: 'my-light',
  font: {
    mono: 'Outbound',
    prism: 'Outbound',
    sans: 'Outbound',
  },
})

export const myDarkTheme = Themes.createFromDark({
  type: 'my-dark',
  font: {
    mono: 'Outbound',
    prism: 'Outbound',
    sans: 'Outbound',
  },
})

type ThemeSelectPropsType = {
  onSelect: (value: string) => void,
  defaultValue: string,
}

const ThemeSelect = ({ onSelect, defaultValue }: ThemeSelectPropsType) => (
  <Grid.Container justify="flex-end" gap={1}>
    <Grid alignItems="flex-start" alignContent="center" justify="center" style={{ height: '100%' }}>
      <Toggle
        type="secondary"
        onChange={((event) => onSelect(event.target.checked ? 'my-light' : 'my-dark'))}
        initialChecked={defaultValue === 'my-light'}
        style={{ height: '100%' }}
      />
    </Grid>
    <Grid>
      <Sun />
    </Grid>
  </Grid.Container>
)

export default ThemeSelect
