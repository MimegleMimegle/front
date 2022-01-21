import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'

import ScaleLoader from 'react-spinners/ScaleLoader'
import styled from 'styled-components'

const GoogleLoginHandler = (props) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.user)

  let code = new URL(window.location.href).searchParams.get('code')

  React.useEffect(async () => {
    await dispatch(userActions.googleLoginDB(code))
  }, [])
  return (
    <BackGround>
      <Flex>
        <Text>대충 로그인 중이라는 내용</Text>
        <ScaleLoader height="160px" width="32px" color="#7362ff" radius="8px" margin="5px" speedMultiplier="2" />
      </Flex>
    </BackGround>
  )
}

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  margin: 100px 0 0 0;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Text = styled.div`
  width: 250px;
  height: 50px;
  margin: 0 0 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: 600;
`

export default GoogleLoginHandler
