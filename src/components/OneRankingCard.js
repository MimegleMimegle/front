import React from 'react'
import styled from 'styled-components'

import Grid from '../elements/Grid'
import { RiVipCrownLine } from 'react-icons/ri'

const OneRankingCard = ({ rank, index, first }) => {
  const styles = { first: first, index: index }
  return (
    <>
      <Container {...styles}>
        <div>
          <ProfileImage src={rank?.profileImage} {...styles}>
            <div className="rank-box">{index === 0 ? <RiVipCrownLine size="20" /> : <p className="rank-text">{Number.isInteger(index) && index + 1}</p>}</div>
          </ProfileImage>
        </div>
        <p className="nickname">{rank?.nickname}</p>
        <Grid flex_center>
          {/* <AiOutlineThunderbolt /> */}
          <span className="count">쳌 {rank?.postCount}</span>
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  max-width: ${(props) => (props.first ? '120px' : '120px')};
  min-width: ${(props) => (props.first ? '120px' : '120px')};
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  .nickname {
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding: 20px 0 5px;
  }
  .count {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 700;
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
  }
`

const ProfileImage = styled.div`
  position: relative;
  width: ${(props) => (props.first ? '90px' : '60px')};
  height: ${(props) => (props.first ? '90px' : '60px')};
  border-radius: 100px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  box-shadow: 0 4px 12px 4px hsl(0deg 0% 64% / 36%);
  .rank-box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -5px;
    background-color: ${(props) => (props.index === 0 ? '#FFE330' : props.index === 1 ? '#FF8E00' : '#00A0FF')};
    width: ${(props) => (props.first ? '30px' : '20px')};
    height: ${(props) => (props.first ? '30px' : '20px')};
    border-radius: 30px;
    cursor: default;
    .rank-text {
      font-size: ${(props) => (props.first ? '16px' : '12px')};
      font-weight: 700;
      height: fit-content;
    }
  }
`

export default OneRankingCard
