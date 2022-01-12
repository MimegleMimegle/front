import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

const BottomPopup = (props) => {
  const { isOpen, onClose, children, heightPixel } = props

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

  window.addEventListener('keyup', (e) => {
    if (isOpen && e.key === 'Escape') {
      onClose()
    }
  })

  const handleOverlayClick = useCallback(() => onClose(), [onClose])
  const handleContentClick = useCallback((e) => e.stopPropagation(), [])

  useEffect(() => {
    if (isOpen) {
      const currY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

      bodyOverflowStyleRef.current = document.body.style.overflow
      topRef.current = document.body.style.top
      document.body.style.overflow = 'hidden'
      document.body.style.top = `${currY}px`
      setIsInDOM(true)
    } else {
      api.start({ height: '0px', immediate: false })
    }
  }, [isOpen, api])

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
      <Overlay onClick={handleOverlayClick} />
      <animated.div style={springProps} onClick={handleContentClick}>
        {children}
      </animated.div>
    </>
  )
}

const Overlay = styled.div`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: background-color 0.3s ease;
  background-color: rgba(0, 0, 0, 0.6);
`

export default BottomPopup
