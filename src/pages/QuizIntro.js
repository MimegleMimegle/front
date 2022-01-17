import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { history } from '../redux/ConfigureStore'
import { actionCreators as quizActions } from '../redux/modules/quiz'
import { mainApi } from '../shared/api'

import Header from '../components/Header'
import Footer from '../components/Footer'
import AlertModal from '../components/modal/AlertModal'
import Grid from '../elements/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import QuizIntroImage from '../styles/image/quiz_main_image2.gif'

const QuizIntro = (props) => {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [subject, setSubject] = React.useState('')
  const [lv1, setLv1] = React.useState(false)
  const [lv2, setLv2] = React.useState(false)
  const [lv3, setLv3] = React.useState(false)

  const handleChangeSubjectY2000 = (e) => {
    setSubject(e.target.value)
    setLv1(true)
    setLv2(false)
    setLv3(false)
  }

  const handleChangeSubjectY2010 = (e) => {
    setSubject(e.target.value)
    setLv1(false)
    setLv2(true)
    setLv3(false)
  }

  const handleChangeSubjectY2020 = (e) => {
    setSubject(e.target.value)
    setLv1(false)
    setLv2(false)
    setLv3(true)
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
      dispatch(quizActions.initAnswer())
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }, [])

  useEffect(() => {
    async function submitVisitors() {
      try {
        const result = await mainApi.countVisitors()
      } catch (error) {
        console.log('방문자 전송 문제 발생', error.response)
      }
    }
    submitVisitors()
  }, [])

  return (
    <>
      <Header type="QuizIntro" location="밈퀴즈" />
      <Wrapper>
        {!loading ? (
          <>
            <ImageSection>
              <img src={QuizIntroImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </ImageSection>
            <SubjectSection>
              <div style={{ padding: '16px 0 10px' }}>
                <p className="subject-question">어느 레벨의 밈을</p>
                <p className="subject-question">테스트하고 싶으신가요?</p>
              </div>
              <div className="subject-button-box">
                <button className={`subject-button ${lv1 ? 'selected' : ''}`} value="lv1" onClick={handleChangeSubjectY2000}>
                  Lv. 밈기적
                </button>
              </div>
              <div className="subject-button-box">
                <button className={`subject-button ${lv2 ? 'selected' : ''}`} value="lv2" onClick={handleChangeSubjectY2010}>
                  Lv. 밈잘알
                </button>
              </div>
              <div className="subject-button-box">
                <button className={`subject-button ${lv3 ? 'selected' : ''}`} value="lv3" onClick={handleChangeSubjectY2020}>
                  Lv. 밈중독
                </button>
              </div>
            </SubjectSection>
            <div style={{ width: '100%', height: '6px' }}></div>
            <ButtonSection>
              <div className="start-button-box box1">
                <button className="start-button" onClick={handleStartQuiz}>
                  시작!
                </button>
              </div>
              <div className="start-button-box box2"></div>
            </ButtonSection>
          </>
        ) : (
          <Grid flex_center height="100%">
            <CircularProgress color="inherit" />
          </Grid>
        )}
      </Wrapper>
      <Footer />
      {showModal && (
        <AlertModal showModal={showModal}>
          <p>퀴즈 주제를 선택해주세요! 🤓</p>
        </AlertModal>
      )}
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 56px 0 80px;
`

const ImageSection = styled.div`
  width: 100%;
  height: fit-content;
  overflow: hidden;
  border-top: 2px solid ${({ theme }) => theme.colors.black};
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
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
  .subject-button-box {
    width: 100%;
    padding: 12px 48px;
    .subject-button {
      width: 100%;
      height: fit-content;
      padding: 15px 24px;
      border: 2px solid ${({ theme }) => theme.colors.black};
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
  }
`

const ButtonSection = styled.div`
  position: relative;
  width: 100%;
  .start-button-box {
    width: 100px;
    height: 40px;
    position: absolute;
    border: 2px solid ${({ theme }) => theme.colors.black};
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
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    transition-duration: 0.3s;
    &:active {
      left: calc(50%);
      transform: translateX(calc(-50% + 4px));
      top: 12px;
    }
  }
  .box2 {
    top: 12px;
    left: calc(50%);
    transform: translateX(calc(-50% + 4px));
    background-color: ${({ theme }) => theme.colors.white};
  }
`

export default QuizIntro
