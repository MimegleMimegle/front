import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import OneImageCard from '../../components/image/OneImageCard'

const ImageList = (props) => {
  const dispatch = useDispatch()

  const [sortByDate, setSortByDate] = React.useState(true)
  const [sortByPopularity, setSortByPopularity] = React.useState(false)

  const handleChangeDate = () => {
    setSortByDate(true)
    setSortByPopularity(false)
  }
  const handleChangePopularity = () => {
    setSortByDate(false)
    setSortByPopularity(true)
  }

  return (
    <>
      <Wrapper>
        <PopularSection>
          <div style={{ borderBottom: '1px solid #e5e5e5' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700' }}>명예의 전당</h2>
          </div>
          <Container>이미지 섹션</Container>
        </PopularSection>
        <GeneralSection>
          <div style={{ borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700' }}>짤 방앗간</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button className={`sort-button ${sortByDate ? 'active' : ''}`} onClick={handleChangeDate}>
                최신순
              </button>
              <button className={`sort-button ${sortByPopularity ? 'active' : ''}`} onClick={handleChangePopularity}>
                인기순
              </button>
            </div>
          </div>
          <Container>
            {sortByDate && (
              <GridLayout>
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
              </GridLayout>
            )}
            {sortByPopularity && <OneImageCard />}
          </Container>
        </GeneralSection>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PopularSection = styled.div`
  width: 100%;
  padding: 20px 20px 0;
`

const GeneralSection = styled.div`
  width: 100%;
  padding: 20px 20px 0;
  .sort-button {
    margin: 0 4px;
    width: 100%;
    height: 20px;
    border: 1px solid #585858;
    border-radius: 10px;
    font-size: 9px;
  }
  .active {
    transition: all 0.3s ease-in-out;
    color: #fff;
    background-color: #585858;
  }
`

const Container = styled.div`
  padding: 24px 0 0;
`

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
`

export default ImageList
