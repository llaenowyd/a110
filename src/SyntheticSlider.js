import React from 'react'
import Swipe from 'react-easy-swipe'

import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  slidden: {
    alignItems: 'center',
    backgroundColor: 'darkolivegreen',
    display: 'flex',
    color: 'tan',
    height: '100%',
    justifyContent: 'center',
    margin: '1em',
    padding: '1em',
    width: '10%',
  },
  syntheticSlider: {
    backgroundColor: 'tan',
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'hidden',
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

  const onSwipeStart = () => {
    console.log('onSwipeStart')
  }

  const onSwipeMove = () => {
    console.log('onSwipeMove')
  }

  const onSwipeEnd = () => {
    console.log('onSwipeEnd')
  }

  return (
    <Swipe
      onSwipeStart={onSwipeStart}
      onSwipeMove={onSwipeMove}
      onSwipeEnd={onSwipeEnd}>
      <div className={classes.syntheticSlider}>
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
  )
}

export default SyntheticSlider
