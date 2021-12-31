import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const InfinityScroll = ({ children, callNext, paging }) => {
  const handleCallNext = _.throttle(function () {
    callNext()
  }, 1000)

  const spinnerRef = useRef(null)
  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      handleCallNext()
    }
  })

  useEffect(() => {
    if (paging.next === null) return
    if (!spinnerRef.current) return

    handleObserver.observe(spinnerRef.current)

    return () => {
      spinnerRef.current && handleObserver.unobserve(spinnerRef.current)
    }
  }, [paging])

  return (
    <>
      {children}
      {paging.next && <Spinner ref={spinnerRef}></Spinner>}
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
  text-align: center;
  padding: 20px 0 40px;
`

export default InfinityScroll
