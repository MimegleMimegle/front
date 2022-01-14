import React from 'react'
import styled from 'styled-components'

import DictNavBar from '../../components/DictNavBar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OneRankCard from '../../components/OneRankCard'
import DictChart from '../../components/DictChart'
import Grid from '../../elements/Grid'

const DictStat = (props) => {
  return (
    <>
      <Header location="밈 사전"></Header>
      <Wrapper>
        <DictNavBar />
        <DictSection>
          <Grid padding="0 0 3px">
            <span className="highlight">nickname</span> 님,
          </Grid>
          <Grid padding="0 0 3px">
            오늘 등록된 <span className="highlight border">n</span>개를 더해서,{' '}
          </Grid>
          <Grid>
            지금까지 총 <span className="highlight border">n</span>개의 <span className="highlight">밈 단어</span>가 등록되었어요!
          </Grid>
        </DictSection>
        <RankSection>
          <div className="section-title">👑 열정적인 밈글러 top3</div>
          <div className="rank-container">
            <OneRankCard />
            <OneRankCard />
            <OneRankCard />
          </div>
        </RankSection>
        <ChartSection>
          <div className="section-title">🧐 최근 일주일 동안 얼마나 등록되었을까요?</div>
          <div className="graph-container">
            <DictChart />
            <div className="modifiedAt">00:00 기준</div>
          </div>
        </ChartSection>

        <QNASection>
          <div className="section-title">🙌🏻 답변을 기다리고 있어요!</div>
          <div className="qna-container">
            <div>
              <div>해결된 질문</div>
              <div>질문</div>
              <div>질문</div>
              <div>질문</div>
            </div>
            <div>
              <div>답변을 기다리는 질문</div>
              <div>질문</div>
              <div>질문</div>
              <div>질문</div>
            </div>
          </div>
        </QNASection>
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
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    padding: 0 0 8px;
  }
`

const DictSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 36px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  .highlight {
    font-weight: 700;
  }
  .border {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    padding: 0 10px 0 15px;
  }
`

const RankSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 16px 36px;
  .rank-container {
    width: 544px;
    height: 192px;
    padding: 16px;
    background-color: #eee;
    border-radius: 10px;
    overflow-x: auto;
    display: flex;
  }
`

const ChartSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 16px 36px;
  .graph-container {
    background-color: #fff;
    height: 280px;
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
  }
`

export default DictStat
