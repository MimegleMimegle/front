import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { dictApi } from '../../shared/api'

import DictNavBar from '../../components/DictNavBar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OneRankCard from '../../components/OneRankCard'
import DictChart from '../../components/DictChart'
import OneQnaQuestion from '../../components/OneQnaQuestion'
import Grid from '../../elements/Grid'
import CircularProgress from '@mui/material/CircularProgress'

import 'swiper/swiper.min.css'

const DictStat = (props) => {
  const [rankList, setRankList] = useState('')
  const [chartData, setChartData] = useState('')
  const [totalDict, setTotalDict] = useState('')
  const [remainedQuestion, setRemainedQuestion] = useState('')
  const [completedQuestion, setCompletedQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  console.log(chartData)

  useEffect(() => {
    setLoading(true)
    async function getStat() {
      try {
        const { data } = await dictApi.getDictStat()
        setRankList(data.data.dictPostRank)
        setChartData(data.data.dictCountWeeks)
        setTotalDict(data.data.dictCountAll)
        setCompletedQuestion(data.data.completeQuestionList)
        setRemainedQuestion(data.data.remainQuestionList)
      } catch (error) {
        console.log('사전 통계 데이터 조회 실패', error.response)
      }
    }
    getStat()
    setLoading(false)
  }, [])

  return (
    <>
      <Header location="밈 사전"></Header>
      <Wrapper>
        {!loading ? (
          <>
            <DictNavBar />
            <RankSection>
              <div className="section-title">👑 열정적인 밈글러 top3</div>
              <StyledSwiper slidesPerView={2.16} spaceBetween={16} freeMode={true} lazy={true}>
                {rankList &&
                  rankList.map((rank, index) => {
                    return (
                      <SwiperSlide key={`rank-${index}`}>
                        <OneRankCard rank={rank} index={index} />
                      </SwiperSlide>
                    )
                  })}
              </StyledSwiper>
            </RankSection>
            <ChartSection>
              <div className="section-title">🧐 최근 일주일 동안 얼마나 등록되었을까요?</div>
              <div className="graph-container">
                <DictChart chartData={chartData} />
                <div className="modifiedAt">00:00 기준</div>
                <Grid padding="10px 0 6px">
                  <span className="highlight">오늘</span> 등록된 <span className="highlight border">n</span>개를 더해서,{' '}
                </Grid>
                <Grid>
                  총 <span className="highlight border">{totalDict}</span>개의 <span className="highlight">밈 단어</span>가 등록되었어요!
                </Grid>
              </div>
            </ChartSection>
            <QNASection>
              <div className="section-title">🙌🏻 답변을 기다리고 있어요!</div>
              <div className="qna-container">
                <Grid flex_center column>
                  <Grid>
                    <div className="qna-title">답변을 기다리는 질문</div>
                    <Grid flex_center column padding="16px 0">
                      {remainedQuestion &&
                        remainedQuestion.map((question) => {
                          return <OneQnaQuestion key={`question-${question.questionId}`} question={question} />
                        })}
                    </Grid>
                  </Grid>
                  <Grid>
                    <div className="qna-title">해결된 질문</div>
                    <Grid flex_center column padding="16px 0 0">
                      {completedQuestion &&
                        completedQuestion.map((question) => {
                          return <OneQnaQuestion key={`question-${question.questionId}`} question={question} />
                        })}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </QNASection>
          </>
        ) : (
          <Grid flex_center height="100%">
            <CircularProgress color="inherit" />
          </Grid>
        )}
      </Wrapper>
      <Footer />
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  height: 100%;
  padding: 84px 0 0;
  .section-title {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    padding: 0 0 8px;
  }
`
const RankSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 36px;
`

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: fit-content;
  padding: 16px;
  background-color: #eee !important;
  border-radius: 10px;
  cursor: grabbing;
  &::-webkit-scrollbar {
    display: none;
  }
  .swiper-slide {
    width: fit-content !important;
    background-color: transparent !important;
  }
`

const ChartSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 16px 36px;
  .graph-container {
    background-color: #fff;
    height: 360px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 35px 4px hsl(0deg 0% 64% / 25%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .modifiedAt {
      width: 100%;
      text-align: right;
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
    font-size: ${({ theme }) => theme.fontSizes.xl};
    .highlight {
      font-weight: 700;
    }
    .border {
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
      padding: 0 10px 0 15px;
    }
  }
`

const QNASection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 16px 100px;
  .qna-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 35px 4px hsl(0deg 0% 64% / 25%);
    .qna-title {
      width: fit-content;
      font-weight: 700;
      /* background-image: linear-gradient(transparent 65%, #ffe400 35%); */
    }
  }
`

export default DictStat
