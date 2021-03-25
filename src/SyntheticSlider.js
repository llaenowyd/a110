import React from 'react'
import Swipe from 'react-easy-swipe'

import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  diag: {
    color: 'darkblue',
    height: '2em',
    width: '100%',
  },
  slidden: ({widthPerTile}) => ({
    height: '100%',
    maxWidth: `${widthPerTile}px`,
    padding: '0.5em',
    width: `${widthPerTile}px`,
  }),
  sliddenContent: {
    alignItems: 'center',
    backgroundColor: 'darkolivegreen',
    color: 'tan',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  syntheticSlider: {
    backgroundColor: 'tan',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    width: '100%',
  },
  syntheticSliderRow: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'hidden',
    paddingBottom: '1em',
    width: '100%',
  },
})

const Slidden = ({classes, n}) => {
  return (
    <div className={classes.slidden}>
      <div className={classes.sliddenContent}>
        {`${n}`}
      </div>
    </div>
  )
}

const SyntheticSlider = ({numElements, pageSize, viewportWidth}) => {
  const widthPerTile = viewportWidth / pageSize
  const classes = useStyles({widthPerTile})

  const [diag, setDiag] = React.useState(0)
  const [swipedPercent, setSwipedPercent] = React.useState(0)
  const [ephemeralSwipedPercent, setEphemeralSwipedPercent] = React.useState(0)

  // edge case, pageSize >= numElements
  const contentPerScreen = pageSize / numElements
  const percentContentPerScreen = 100 * contentPerScreen

  console.log({
    viewportWidth,
    widthPerTile,
    contentPerScreen,
    percentContentPerScreen,
  })

  const onSwipeStart = () => {
    setDiag(Math.round(swipedPercent))
  }

  const onSwipeMove = position => {
    const screenPerSwipe = position.x / viewportWidth
    const contentPerSwipe = screenPerSwipe * contentPerScreen
    const percentContentSwiped = contentPerSwipe * 100
    const nextSwipedPercent = swipedPercent + percentContentSwiped

    const clampedNextSwipedPercent = Math.max(-100 + percentContentPerScreen, Math.min(0, nextSwipedPercent))

    console.log({
      posX: position.x,
      screenPerSwipe,
      contentPerSwipe,
      percentContentSwiped,
      nextSwipedPercent,
      clampedNextSwipedPercent,
    })

    setDiag(Math.round(clampedNextSwipedPercent))

    setEphemeralSwipedPercent(clampedNextSwipedPercent)
  }

  const onSwipeEnd = () => {
    setDiag(Math.round(ephemeralSwipedPercent))
    setSwipedPercent(ephemeralSwipedPercent)
    setEphemeralSwipedPercent(0)
  }

  const swipeOffsetStyle = React.useMemo(
    () => ({
      transform: `translateX(${ephemeralSwipedPercent ? ephemeralSwipedPercent : swipedPercent}%)`
    }),
    [ephemeralSwipedPercent, swipedPercent]
  )

  return (
    <div className={classes.syntheticSlider}>
      <div className={classes.diag}>n={numElements} content offset: {diag}%</div>
      <Swipe
        onSwipeStart={onSwipeStart}
        onSwipeMove={onSwipeMove}
        onSwipeEnd={onSwipeEnd}>
        <div className={classes.syntheticSliderRow} style={swipeOffsetStyle}>
          {
            (
              () => {
                const result = []
                for (let i = 0; i < numElements; i++) {
                  result.push(<Slidden classes={classes} key={i} n={i} />)
                }
                return result
              }
            )()
          }
        </div>
      </Swipe>
    </div>
  )
}

export default SyntheticSlider
