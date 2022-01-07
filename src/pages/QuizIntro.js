import React from 'react'
import styled from 'styled-components'
import { history } from '../redux/ConfigureStore'
import Header from '../components/Header'
import ModalWrapper from '../components/ModalWrapper'
import ModalContainer from '../components/ModalContainer'
import QuizIntroImage from '../styles/image/quiz_main_image2.gif'

const QuizIntro = (props) => {
  const [showModal, setShowModal] = React.useState(false)
  const [subject, setSubject] = React.useState('')
  const [y2000, setY2000] = React.useState(false)
  const [y2010, setY2010] = React.useState(false)
  const [y2020, setY2020] = React.useState(false)

  const handleChangeSubjectY2000 = (e) => {
    setSubject(e.target.value)
    setY2000(true)
    setY2010(false)
    setY2020(false)
  }

  const handleChangeSubjectY2010 = (e) => {
    setSubject(e.target.value)
    setY2000(false)
    setY2010(true)
    setY2020(false)
  }

  const handleChangeSubjectY2020 = (e) => {
    setSubject(e.target.value)
    setY2000(false)
    setY2010(false)
    setY2020(true)
  }

  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false)
    }, 2000)
  }

  const handleStartQuiz = () => {
    if (subject === '') {
      setShowModal(true)
      closeModal()
      return
    } else {
      history.push(`/quiz/${subject}`)
      // window.location.reload()
    }
  }

  return (
    <>
      <Header type="QuizIntro" location="밈퀴즈" />
      <Wrapper>
        <ImageSection>
          <img src={QuizIntroImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </ImageSection>
        <SubjectSection>
          <div style={{ padding: '15px 0 10px' }}>
            <p className="subject-question">어느 레벨 밈을</p>
            <p className="subject-question">테스트하고 싶으신가요?</p>
          </div>
          <div>
            <button className={`subject-button ${y2000 ? 'selected' : ''}`} value="IMAGE" onClick={handleChangeSubjectY2000}>
              Lv. 밈기적
            </button>
          </div>
          <div>
            <button className={`subject-button ${y2010 ? 'selected' : ''}`} value="y2010" onClick={handleChangeSubjectY2010}>
              Lv. 밈잘알
            </button>
          </div>
          <div>
            <button className={`subject-button ${y2020 ? 'selected' : ''}`} value="y2020" onClick={handleChangeSubjectY2020}>
              Lv. 밈중독
            </button>
          </div>
        </SubjectSection>
        <div style={{ width: '100%', height: '10px' }}></div>
        <ButtonSection>
          <div className="start-button-box box1">
            <button className="start-button" onClick={handleStartQuiz}>
              시작!
            </button>
          </div>
          <div className="start-button-box box2"></div>
        </ButtonSection>
      </Wrapper>
      {showModal && (
        <ModalWrapper visible={true}>
          <ModalContainer>
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p>퀴즈 주제를 선택해주세요!</p>
            </div>
          </ModalContainer>
        </ModalWrapper>
      )}
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageSection = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const SubjectSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .subject-question {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-family: 'YdestreetL';
    font-style: normal;
    font-weight: normal;
    text-align: center;
  }
  .subject-button {
    width: 240px;
    height: 48px;
    padding: 15px 24px;
    margin: 8px auto;
    border: 1px solid ${({ theme }) => theme.colors.black};
    text-align: left;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 500;
  }
  .selected {
    transition: background-color 0.3s ease-in-out;
    background-color: ${({ theme }) => theme.colors.yellow};
  }
`

const ButtonSection = styled.div`
  position: relative;
  width: 100%;
  .start-button-box {
    width: 107px;
    height: 40px;
    position: absolute;
    border: 1px solid ${({ theme }) => theme.colors.black};
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.blue};
    .start-button {
      width: 100%;
      height: 100%;
      padding: 0;
      border-radius: 20px;
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      font-family: 'YdestreetB';
      font-style: normal;
      font-weight: normal;
    }
  }
  .box1 {
    top: 8px;
    left: 49.5%;
    transform: translateX(-49.5%);
    z-index: 2;
    transition-duration: 0.3s;
    &:active {
      left: 51%;
      transform: translateX(-51%);
      top: 12px;
    }
  }
  .box2 {
    top: 12px;
    left: 51%;
    transform: translateX(-51%);
    background-color: ${({ theme }) => theme.colors.white};
  }
`

export default QuizIntro
