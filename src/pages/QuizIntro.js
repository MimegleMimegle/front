import React from 'react'
import styled from 'styled-components'

import { history } from '../redux/ConfigureStore'

import ModalWrapper from '../components/ModalWrapper'
import ModalContainer from '../components/ModalContainer'
import QuizIntroImage from '../styles/image/quiz_main_image1.gif'

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
    } else {
      history.push(`/quiz/${subject}`)
      window.location.reload()
    }
  }

  console.log(showModal)
  console.log(subject)

  return (
    <>
      <Wrapper>
        <ImageSection>
          <img src={QuizIntroImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </ImageSection>
        <SubjectSection>
          <div style={{ padding: '20px 0 12px', fontSize: '18px', textAlign: 'center' }}>
            어느 시대의 밈을
            <br />
            테스트하고 싶으신가요?
          </div>
          <div>
            <button className={`subject-button ${y2000 ? 'selected' : ''}`} value="y2000" onClick={handleChangeSubjectY2000}>
              2000
            </button>
          </div>
          <div>
            <button className={`subject-button ${y2010 ? 'selected' : ''}`} value="y2010" onClick={handleChangeSubjectY2010}>
              2010
            </button>
          </div>
          <div>
            <button className={`subject-button ${y2020 ? 'selected' : ''}`} value="y2020" onClick={handleChangeSubjectY2020}>
              2020
            </button>
          </div>
        </SubjectSection>
        <div style={{ width: '100%', height: '16px' }}></div>
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
  .subject-button {
    width: 240px;
    height: 48px;
    padding: 15px 24px;
    margin: 8px auto;
    border: 1px solid #111;
    text-align: left;
    font-size: 16px;
  }
  .selected {
    transition: background-color 0.3s ease-in-out;
    background-color: #faea59;
  }
`

const ButtonSection = styled.div`
  position: relative;
  width: 100%;
  .start-button-box {
    width: 107px;
    height: 40px;
    position: absolute;
    border: 1px solid #111;
    border-radius: 20px;
    background-color: #00a0ff;
    .start-button {
      width: 100%;
      height: 100%;
      padding: 0;
      border-radius: 20px;
      font-size: 18px;
      font-weight: 700;
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
    background-color: #fff;
  }
`

export default QuizIntro
