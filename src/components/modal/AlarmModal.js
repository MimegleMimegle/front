import React from 'react'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'

import MemegleIcon from '../../styles/image/smileIcon_Yellow.png'
import { ReactComponent as CloseIcon } from '../../styles/icons/X_24dp.svg'

const AlarmModal = ({ showAlarm, setShowAlarm, profile }) => {
  window.addEventListener('keyup', (e) => {
    if (showAlarm && e.key === 'Escape') {
      setShowAlarm(false)
    }
  })

  const alarmList = profile ? profile.alarm : []
  console.log(profile)
  console.log(alarmList)
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
          {profile &&
            alarmList.length > 0 &&
            alarmList.map((alarm, index) => {
              return (
                <div className={`alarm-box ${index === 0 && 'first'}`} key={`alarm-id-${alarm.alarmId}`} onClick={() => history.push(`/dict/question/detail/${alarm.navId}`)}>
                  <ProfileImage src={profile ? profile.profileImage : MemegleIcon}></ProfileImage>
                  <div className="alarm-content">
                    {profile?.nickname} 님의 {alarm.alarmType === 'RECEIVE_COMMENT' ? '질문에 답글이 달렸어요!' : alarm.alarmType === 'SELECT_USER' ? '답글이 채택되었어요!' : ''}
                  </div>
                </div>
              )
            })}
        </BodySection>
      </Container>
    </>
  )
}

const Container = styled.div`
  position: absolute;
  top: 56px;
  right: 16px;
  width: 300px;
  max-width: 360px;
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
  color: #ffffff;
  .alarm-title {
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    color: #ffffff;
  }
  .close-icon {
    cursor: pointer;
  }
`

const BodySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    .alarm-content {
      width: fit-content;
      padding: 0 0 0 10px;
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  }
`

const ProfileImage = styled.div`
  max-width: 32px;
  min-width: 32px;
  height: 32px;
  border-radius: 20px;
  border: 2px solid #000;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

export default AlarmModal
