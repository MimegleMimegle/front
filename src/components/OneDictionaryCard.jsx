import React from 'react'
import styled from 'styled-components'
import { history } from '../redux/ConfigureStore'

import Grid from '../elements/Grid'
import { ReactComponent as EmptyBookMarkIcon } from '../styles/icons/bookmark_blank.svg'
import { ReactComponent as FillBookMarkIcon } from '../styles/icons/bookmark_filled.svg'

const OneDictionaryCard = ({ dict }) => {
  return (
    <>
      <Container onClick={() => history.push(`/dict/detail/${dict?.dictId}`)}>
        <DictTitle>{dict?.title}</DictTitle>
        <DictSummary>{dict?.summary}</DictSummary>
        <Grid flex_between height="fit-content">
          <Grid flex_align>
            {dict?.like ? <FillBookMarkIcon className="icon" fill="#878c92" /> : <EmptyBookMarkIcon className="icon" fill="#878c92" />}
            <DictLikeCount>{dict?.likeCount}</DictLikeCount>
          </Grid>
          <Grid flex_end>
            <DictFirstWriter>{dict?.firstWriter}</DictFirstWriter>
            <DictCreateAt>{dict?.createdAt.split('T', 1)}</DictCreateAt>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  border-top: 2px solid #e5e5e5;
  border-bottom: 2px solid #e5e5e5;
  margin: 10px 0 20px;
  padding: 16px 24px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fff;
  -webkit-appearance: none;
  cursor: zoom-in;
  .icon {
    cursor: pointer;
  }
`

const DictTitle = styled.div`
  color: #016dad;
  width: 100%;
  height: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
`

const DictSummary = styled.div`
  width: 100%;
  height: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.base};
  padding: 10px 0 20px;
  word-break: keep-all;
`

const DictLikeCount = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  padding: 0 0 0 3px;
  color: ${({ theme }) => theme.colors.grey};
`

const DictFirstWriter = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: 0 15px 0 0;
  color: ${({ theme }) => theme.colors.grey};
  width: fit-content;
  height: fit-content;
`

const DictCreateAt = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  width: fit-content;
  color: ${({ theme }) => theme.colors.grey};
`

export default OneDictionaryCard
