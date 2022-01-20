import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/ko'
import { Swiper, SwiperSlide } from 'swiper/react'
import { dictApi } from '../../shared/api'

import DictNavBar from '../../components/DictNavBar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OneRankingCard from '../../components/OneRankingCard'
import DictChart from '../../components/DictChart'
import OneQnaQuestion from '../../components/OneQnaQuestion'
import Grid from '../../elements/Grid'
import Title from '../../elements/Title'
import CircularProgress from '@mui/material/CircularProgress'

import 'swiper/swiper.min.css'

const DictStat = (props) => {
  const nowTime = moment().format('HH:mm')

  const [rankList, setRankList] = useState('')
  const [chartData, setChartData] = useState('')
  const [totalDict, setTotalDict] = useState('')
  const [remainedQuestion, setRemainedQuestion] = useState('')
  const [completedQuestion, setCompletedQuestion] = useState('')
  const [loading, setLoading] = useState(false)

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
    setTimeout(() => setLoading(false), 400)
  }, [])

  return (
    <>
      <Header location="오픈 밈사전"></Header>
      <Wrapper>
        <DictNavBar />
        {!loading ? (
          <>
            <RankSection>
              <Title>열정적인 밈글러 top3</Title>
              <div className="rank-container">
                <OneRankingCard rank={rankList[1]} index={1} />
                <OneRankingCard rank={rankList[0]} index={0} first />
                <OneRankingCard rank={rankList[2]} index={2} />
              </div>
              <div className="rank-info">
                <span className="yde-icon-check">쳌</span>단어 등록 개수 기준
              </div>
            </RankSection>
            <ChartSection>
              <Title>위클리 리포트</Title>
              <div className="chart-container">
                <DictChart chartData={chartData} />
                <div className="updated-at">{nowTime} 기준</div>
                <Grid flex_center column padding="16px 0 0">
                  <p className="chart-text">
                    <span className="chart-highlight">오늘</span> 등록된 <span className="chart-highlight border">{chartData && chartData[6].count}</span>개를 더해서,{' '}
                  </p>
                  <p className="chart-text">
                    총 <span className="chart-highlight border">{totalDict}</span>개의 <span className="chart-highlight">밈 단어</span>가 등록되었어요!
                  </p>
                </Grid>
              </div>
            </ChartSection>
            <QNASection>
              <Grid flex_center column>
                <Grid>
                  <Title>답변을 기다리고 있어요!</Title>
                  <StyledSwiper slidesPerView="auto" spaceBetween={16} freeMode={true} lazy={true}>
                    {remainedQuestion &&
                      remainedQuestion.map((question, index) => {
                        return (
                          <SwiperSlide key={`question-id-${question.questionId}`}>
                            <OneQnaQuestion question={question} />
                          </SwiperSlide>
                        )
                      })}
                  </StyledSwiper>
                </Grid>
                <Grid>
                  <Title>따끈따끈한 답변이 등록됐어요!</Title>
                  <StyledSwiper slidesPerView="auto" spaceBetween={16} freeMode={true} lazy={true}>
                    {completedQuestion &&
                      completedQuestion.map((question, index) => {
                        return (
                          <SwiperSlide key={`question-id-${question.questionId}`}>
                            <OneQnaQuestion question={question} index={index} />
                          </SwiperSlide>
                        )
                      })}
                  </StyledSwiper>
                </Grid>
              </Grid>
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
  padding: 56px 0 0;
  display: flex;
  flex-direction: column;
`
const RankSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 36px;
  .rank-container {
    max-width: 400px;
    width: 100%;
    height: fit-content;
    background-color: #fff;
    box-shadow: 0 4px 35px 4px hsl(0deg 0% 64% / 25%);
    border: 2px solid ${({ theme }) => theme.colors.line};
    padding: 20px 0;
    margin: 16px 0 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
  }
  .rank-info {
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: 700;
    color: #c4c4c4;
    text-align: right;
    .yde-icon-check {
      font-family: 'YdestreetB';
      font-style: normal;
      font-weight: normal;
    }
  }
`

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: fit-content;
  padding: 16px 0 54px;
  &::-webkit-scrollbar {
    display: none;
  }
  .swiper-slide {
    width: 170px !important;
    background-color: transparent !important;
  }
`

const ChartSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 16px 48px;
  .chart-container {
    background-color: #fff;
    height: 360px;
    padding: 20px;
    margin: 16px 0 0;
    box-shadow: 0 4px 35px 4px hsl(0deg 0% 64% / 25%);
    border: 2px solid ${({ theme }) => theme.colors.line};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .updated-at {
      width: 100%;
      text-align: right;
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
    .chart-text {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
    font-size: ${({ theme }) => theme.fontSizes.xl};
    .chart-highlight {
      font-weight: 700;
    }
    .border {
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
      padding: 0 5px;
    }
  }
`

const QNASection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 16px 80px;
`

export default DictStat
