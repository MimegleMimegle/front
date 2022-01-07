import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress'

const InfinityScroll = ({ children, callNext, paging }) => {
  const spinnerRef = useRef(null)
  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      callNext()
    }
  })

  useEffect(() => {
    if (paging.next === false) return
    if (!spinnerRef.current) return

    handleObserver.observe(spinnerRef.current)

    return () => {
      spinnerRef.current && handleObserver.unobserve(spinnerRef.current)
    }
  }, [paging])

  return (
    <>
      {children}
      {paging.next && (
        <Spinner ref={spinnerRef}>
          <CircularProgress color="inherit" />
        </Spinner>
      )}
    </>
  )
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  isNext: false,
  loading: false,
}

const Spinner = styled.div`
  width: 100%;
  text-align: center;
`

export default InfinityScroll
