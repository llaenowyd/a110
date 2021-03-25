import React from 'react'
import Swipe from 'react-easy-swipe'

import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  diag: {
    color: 'darkblue',
    height: '2em',
    width: '100%',
  },
  slidden: {
    alignItems: 'center',
    backgroundColor: 'darkolivegreen',
    display: 'flex',
    color: 'tan',
    height: '100%',
    justifyContent: 'center',
    margin: '0 1em',
    padding: '1em',
    width: '10%',
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

const Slidden = ({n}) => {
  const classes = useStyles()

  return (
    <div className={classes.slidden} key={n}>{`${n}`}</div>
  )
}

const SyntheticSlider = () => {
  const classes = useStyles()

  const [diag, setDiag] = React.useState('')
  const [swipedOffset, setSwipedOffset] = React.useState(0)

  const onSwipeStart = () => {
    console.log('onSwipeStart')
    setDiag(`onSwipeStart ${swipedOffset}`)
  }

  const onSwipeMove = position => {
    console.log('onSwipeMove')
    setDiag(`onSwipeMove ${swipedOffset} + ${position.x}`)
    setSwipedOffset(position.x + swipedOffset)
  }

  const onSwipeEnd = () => {
    console.log('onSwipeEnd')
    setDiag(`onSwipeEnd ${swipedOffset}`)
  }

  const swipeOffsetStyle = React.useMemo(
    () => ({
      transform: `translateX(-${swipedOffset}px)`
    }),
    [swipedOffset]
  )

  return (
    <div className={classes.syntheticSlider}>
      <div className={classes.diag}>{diag}</div>
      <Swipe
        onSwipeStart={onSwipeStart}
        onSwipeMove={onSwipeMove}
        onSwipeEnd={onSwipeEnd}>
        <input type="button" onClick={() => setSwipedOffset(swipedOffset+10)} value="+"/>
        <input type="button" onClick={() => setSwipedOffset(swipedOffset-10)} value="-"/>
        <div className={classes.syntheticSliderRow} style={swipeOffsetStyle}>
          {
            (
              () => {
                const result = []
                for (let i = 0; i < 100; i++) {
                  result.push(<Slidden n={i} />)
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
