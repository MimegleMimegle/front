import React from 'react'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'

import { ReactComponent as CloseIcon } from '../../styles/icons/X_24dp.svg'

const AlarmModal = ({ showAlarm, setShowAlarm, alarmList, profile }) => {
  const userId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const isLogin = userId !== null && token !== null ? true : false

  window.addEventListener('keyup', (e) => {
    if (showAlarm && e.key === 'Escape') {
      setShowAlarm(false)
    }
  })

  return (
    <>
      <Container>
        <HeaderSection>
          <div className="alarm-title">알림</div>
          <CloseIcon
            className="close-icon"
            fill="#FFF"
            onClick={() => {
              setShowAlarm(false)
            }}
          />
        </HeaderSection>
        <BodySection>
          {isLogin ? (
            alarmList.length > 0 ? (
              alarmList.map((alarm, index) => {
                return (
                  <div className={`alarm-box ${index === 0 && 'first'}`} key={`alarm-id-${alarm.alarmId}`} onClick={() => history.push(`/dict/question/detail/${alarm.navId}`)}>
                    <div className="alarm-content">
                      <span className="alarm-nickname">{profile?.nickname}</span> 님의{' '}
                      {alarm.alarmType === 'RECEIVE_COMMENT' ? '질문에 답글이 달렸어요!' : alarm.alarmType === 'SELECT_USER' ? '답글이 채택되었어요!' : ''}
                      {alarm.checked === false ? <UpdateCircle /> : <></>}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="alarm-box first">
                <div className="alarm-content">알림 내역이 없어요!</div>
              </div>
            )
          ) : (
            <div className="alarm-box first">
              <div className="alarm-login">로그인 후 이용할 수 있어요!</div>
            </div>
          )}
        </BodySection>
      </Container>
    </>
  )
}

const Container = styled.div`
  position: absolute;
  top: 56px;
  right: 16px;
  max-width: 330px;
  min-width: 300px;
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  border: 2px solid #000;
  box-shadow: 0 4px 35px 4px hsl(0deg 0% 64% / 35%);
  background-color: #fff;
  z-index: 9999;
`

const HeaderSection = styled.div`
  width: 100%;
  padding: 6px 10px 6px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.blue};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 2px solid #000;

  .alarm-title {
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: #ffffff;
  }
  .close-icon {
    cursor: pointer;
  }
`

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .first {
    border-top: none !important;
  }
  .alarm-box {
    cursor: zoom-in;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 16px;
    border-top: 2px solid ${({ theme }) => theme.colors.line};
    .alarm-nickname {
      font-size: ${({ theme }) => theme.fontSizes.base};
      font-weight: 600;
    }
    .alarm-content {
      width: fit-content;
      font-size: ${({ theme }) => theme.fontSizes.base};
      position: relative;
    }
    .alarm-login {
      width: fit-content;
      font-size: ${({ theme }) => theme.fontSizes.base};
      font-weight: 500;
    }
  }
`

const UpdateCircle = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.blue};
  position: absolute;
  top: -2px;
`

export default AlarmModal
