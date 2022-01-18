import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment/locale/ko'
import { Swiper, SwiperSlide } from 'swiper/react'
import { dictApi } from '../../shared/api'

import DictNavBar from '../../components/DictNavBar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OneRankCard from '../../components/OneRankCard'
import OneRankingCard from '../../components/OneRankingCard'
import DictChart from '../../components/DictChart'
import OneQnaQuestion from '../../components/OneQnaQuestion'
import Grid from '../../elements/Grid'
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
    setTimeout(() => setLoading(false), 500)
  }, [])

  return (
    <>
      <Header location="오픈 밈사전"></Header>
      <Wrapper>
        <DictNavBar />
        {!loading ? (
          <>
            <RankSection>
              <span className="section-title">열정적인 밈글러 top3</span>
              <Grid flex_around padding="24px 0 0">
                <OneRankingCard rank={rankList[1]} index={1} />
                <OneRankingCard rank={rankList[0]} index={0} first />
                <OneRankingCard rank={rankList[2]} index={2} />
              </Grid>
            </RankSection>
            <ChartSection>
              <span className="section-title">위클리 리포트</span>
              <Grid padding="16px 0 0">
                <div className="chart-container">
                  <DictChart chartData={chartData} />
                  <div className="updated-at">{nowTime} 기준</div>
                  <Grid flex_center column>
                    <p className="chart-text">
                      <span className="highlight">오늘</span> 등록된 <span className="highlight border">{chartData && chartData[6].count}</span>개를 더해서,{' '}
                    </p>
                    <p className="chart-text">
                      총 <span className="highlight border">{totalDict}</span>개의 <span className="highlight">밈 단어</span>가 등록되었어요!
                    </p>
                  </Grid>
                </div>
              </Grid>
            </ChartSection>
            <QNASection>
              <Grid flex_center column>
                <Grid>
                  <span className="section-title">답변을 기다리고 있어요!</span>
                  <StyledSwiper slidesPerView={2.45} spaceBetween={16} freeMode={true} lazy={true}>
                    {remainedQuestion &&
                      remainedQuestion.map((question, index) => {
                        return (
                          <SwiperSlide key={`question-id-${question.questionId}`}>
                            <OneQnaQuestion question={question} index={index} />
                          </SwiperSlide>
                        )
                      })}
                  </StyledSwiper>
                </Grid>
                <Grid>
                  <span className="section-title">따끈따끈한 답변이 등록됐어요!</span>
                  <StyledSwiper slidesPerView={2.45} spaceBetween={16} freeMode={true} lazy={true}>
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
  .section-title {
    width: fit-content;
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    line-height: normal;
    background-image: linear-gradient(transparent 70%, #ffe330 30%);
  }
`
const RankSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 40px;
`

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: fit-content;
  padding: 16px 0 40px;
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
  padding: 0 16px 40px;
  .chart-container {
    background-color: #fff;
    height: 360px;
    padding: 20px;
    box-shadow: 0 4px 35px 4px hsl(0deg 0% 64% / 25%);
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
    .highlight {
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
