import React from 'react'
import styled from 'styled-components'

import MemegleIcon from '../styles/image/smileIcon_Yellow.png'

const OneQnaQuestion = (props) => {
  return (
    <>
      <Container>
        <ProfileImage src={MemegleIcon} />
        <div className="qna-question-title">질문 제목</div>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 30px;
  background-color: #fafafa;
  box-shadow: 0 4px 20px 4px hsl(0deg 0% 64% / 30%);
  display: flex;
  align-items: center;
  cursor: pointer;
  .qna-question-title {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: 0 0 0 10px;
  }
`

const ProfileImage = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  background-color: ${({ theme }) => theme.colors.white};
`

export default OneQnaQuestion
