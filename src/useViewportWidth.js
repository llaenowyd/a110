import React from 'react'

const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = React.useState(0)

  React.useLayoutEffect(() => {
    const updateSize = () => setViewportWidth(window.innerWidth)

    updateSize()

    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return viewportWidth
}

export default useViewportWidth
