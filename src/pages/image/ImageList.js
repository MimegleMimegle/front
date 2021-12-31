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
          <Container>
            <PopularGridLayout>
              <OneImageCard />
              <OneImageCard />
              <OneImageCard />
            </PopularGridLayout>
          </Container>
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
              <GeneralGridLayout>
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
                <OneImageCard />
              </GeneralGridLayout>
            )}
            {sortByPopularity && (
              <GeneralGridLayout>
                <OneImageCard />
              </GeneralGridLayout>
            )}
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
  padding: 20px 20px;
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

const PopularGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 110px 152px;
  gap: 8px;

  div {
    &:nth-child(1) {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
    &:nth-child(2) {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }
    &:nth-child(3) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
  }
`

const GeneralGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(121px, 121px);
  gap: 8px;
`

export default ImageList
