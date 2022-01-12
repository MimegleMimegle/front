import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import Backdrop from '@mui/material/Backdrop'

const BottomPopup = (props) => {
  const { shareVisible, setShareVisible, children, heightPixel } = props

  const [isInDOM, setIsInDOM] = useState(false)

  const bodyOverflowStyleRef = useRef(document.body.style.overflow)
  const topRef = useRef(document.body.style.top)

  const [springProps, api] = useSpring(() => ({
    left: '0',
    bottom: '0',
    width: '100%',
    position: 'absolute',
    zIndex: '10000',
    height: '0px',
    onRest: {
      height: (height) => {
        if (height.value === `${heightPixel}px`) {
          return
        }
        if (height.value === '0px') {
          setIsInDOM(false)
        }
      },
    },
  }))

  const handleOverlayClick = useCallback(() => setShareVisible(false), [setShareVisible])
  const handleContentClick = useCallback((e) => e.stopPropagation(), [])

  useEffect(() => {
    if (shareVisible) {
      const currY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      bodyOverflowStyleRef.current = document.body.style.overflow
      topRef.current = document.body.style.top
      document.body.style.overflow = 'hidden'
      document.body.style.top = `${currY}px`
      setIsInDOM(true)
    } else {
      api.start({ height: '0px', immediate: false })
    }
  }, [shareVisible, api])

  useEffect(() => {
    if (isInDOM) {
      api.start({ height: `${heightPixel}px` })
    } else if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = bodyOverflowStyleRef.current
      document.body.style.top = topRef.current
    }
  }, [isInDOM, api, heightPixel])

  useEffect(() => {
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = bodyOverflowStyleRef.current
      document.body.style.top = topRef.current
    }
  }, [])

  if (!isInDOM) return null

  return (
    <>
      {/* <Backdrop open={shareVisible} onClick={handleOverlayClick}> */}
      <Overlay onClick={handleOverlayClick} />
      <animated.div style={springProps} onClick={handleContentClick}>
        {children}
      </animated.div>
      {/* </Backdrop> */}
    </>
  )
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  transition: background-color 0.3s ease;
`

export default BottomPopup
