import React from 'react'
import cx from 'classnames'

import {makeStyles} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import SyntheticSlider from './SyntheticSlider'

const useStyles = makeStyles({
  app: {
    backgroundColor: 'darkBlue',
    bottom: 0,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '4vw',
    fontWeight: 700,
    left: 0,
    overflowX: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bottomRow: {
    marginTop: 'auto',
  },
  fauxContent: {
    backgroundColor: 'lightcoral',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    marginLeft: 'auto',
    flex: 1,
    padding: '1vw',
  },
  fauxSidenav: {
    backgroundColor: 'lightcyan',
    color: 'darkblue',
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1vw',
    padding: '1vw',
    width: '17%',
  },
  row: {
    paddingBottom: '0.5vw',
  },
})

const useWindowSize = () => {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    const updateSize = () => setSize([window.innerWidth, window.innerHeight])

    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, []);
  return size
}

const Row = props => {
  const classes = useStyles()

  return (<div className={cx(classes.row, props.className)}>{props.children}</div>)
}

const App = () => {
  const theme = useTheme()

  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const isSM = useMediaQuery(theme.breakpoints.only('sm'))
  const isMD = useMediaQuery(theme.breakpoints.only('md'))
  const isLG = useMediaQuery(theme.breakpoints.only('lg'))
  const isXL = useMediaQuery(theme.breakpoints.only('xl'))

  const viewportDimensions = useWindowSize()

  const classes = useStyles()

  const breakpointName = isXS ? 'xs' : isSM ? 'sm' : isMD ? 'md' : isLG ? 'lg' : isXL ? 'xl' : '?'
  const breakpointDescription = {
    xs: 'extra-small',
    sm: 'small',
    md: 'medium',
    lg: 'large',
    xl: 'extra-large',
    '?': '???',
  }[breakpointName]

  return (
    <CssBaseline>
      <div className={classes.app}>
        <div className={classes.fauxSidenav}>
          faux side-nav
        </div>
        <div className={classes.fauxContent}>
          <Row>faux content</Row>
          <Row>{`breakpoint: ${breakpointName} (${breakpointDescription})`}</Row>
          <Row>{`viewport width: ${viewportDimensions?.[0]}`}</Row>
          <Row>{`device pixel ratio: ${window.devicePixelRatio}`}</Row>
          <Row className={classes.bottomRow}>
            <SyntheticSlider />
          </Row>
        </div>
      </div>
    </CssBaseline>
  )
}

export default App
