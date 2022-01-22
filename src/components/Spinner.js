import React from 'react'
import styled from 'styled-components'
import Grid from '../elements/Grid'
import WifiSpinner from '../styles/image/wifi.gif'
import RobotSpinner from '../styles/image/spinner.png'
import RobotSpinnerWhite from '../styles/image/spinner_white.png'

const Spinner = ({ children, type }) => {
  const styles = {
    type: type,
  }
  return (
    <>
      <Grid flex_center height="100%">
        <SpinnerBox {...styles}>
          <img className="spinner-wifi" src={WifiSpinner} alt="와이파이 로딩 스피너" />
          <img className="spinner-robot" src={type === 'white' ? RobotSpinnerWhite : RobotSpinner} alt="로봇 로딩 스피너 " />
          <div className="spinner-text">{children}</div>
        </SpinnerBox>
      </Grid>
    </>
  )
}

const SpinnerBox = styled.div`
  max-width: 320px;
  max-height: 320px;
  width: 100%;
  height: 100%;
  /* border: 2px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .spinner-text {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 600;
    padding: 20px 0 0 0;
    color: #767676;
    text-align: center;
  }
  .spinner-wifi {
    width: ${(props) => (props.type === 'white' ? '15px' : '30px')};
    height: ${(props) => (props.type === 'white' ? '10px' : '20px')};
    margin: ${(props) => (props.type === 'white' ? '0 0 5px' : '0 0 10px')};
  }
  .spinner-robot {
    width: ${(props) => (props.type === 'white' ? '50px' : '100px')};
    height: ${(props) => (props.type === 'white' ? '50px' : '100px')};
  }
`

export default Spinner
