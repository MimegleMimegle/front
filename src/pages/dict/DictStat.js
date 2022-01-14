import React from 'react'
import styled from 'styled-components'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OneRankCard from '../../components/OneRankCard'
import Grid from '../../elements/Grid'

const DictStat = (props) => {
  return (
    <>
      <Header location="밈 사전"></Header>
      <Wrapper>
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
            <div>그래프</div>
          </div>
        </ChartSection>
        <div>총 단어, 오늘 등록 단어</div>
        <div>해결 질문, 답변 기다리는 질문</div>
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
  padding: 84px 16px 0;
  .section-title {
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    padding: 0 0 8px;
  }
`

const RankSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 0 36px;
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
  padding: 0 0 36px;
  .graph-container {
    background-color: #fff;
    height: 240px;
    border-radius: 10px;
    box-shadow: 0 4px 35px 4px hsl(0deg 0% 64% / 25%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default DictStat
