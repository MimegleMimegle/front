import React from 'react'
import styled from 'styled-components'
import { history } from '../redux/ConfigureStore'
import Grid from '../elements/Grid'

const OneQnaQuestion = ({ question, index }) => {
  const styles = {
    index: index,
  }

  return (
    <>
      <Container {...styles} onClick={() => history.push(`/dict/question/detail/${question?.questionId}`)}>
        <div className="question-box box1">
          <Grid flex_center height="100%">
            <div className="qna-question-title">{question?.title}</div>
          </Grid>
          <Grid flex_center padding="10px 0 0">
            <ProfileImage src={question?.profileImage} />
          </Grid>
        </div>
        <div className="question-box box2"></div>
      </Container>
    </>
  )
}

const Container = styled.div`
  position: relative;
  width: 150px;
  height: 142px;
  display: flex;
  align-items: center;
  cursor: zoom-in;
  .qna-question-title {
    width: 100%;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  .question-box {
    width: 150px;
    height: 142px;
    position: absolute;
    border: 2px solid ${({ theme }) => theme.colors.black};
  }
  .box1 {
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }
  .box2 {
    top: 6px;
    left: 6px;
    background-color: ${(props) => (props.index === 0 ? '#FFD400' : props.index === 1 ? '#F97D39' : props.index === 2 ? '#6698FC' : '#7b7b7b')};
  }
`

const ProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 30px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid black;
`

export default OneQnaQuestion
