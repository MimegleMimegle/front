import React from 'react'
import { history } from '../redux/ConfigureStore'
import '../styles/css/DictList.css'

import Grid from '../elements/Grid'
import { ReactComponent as EmptyHeartIcon } from '../styles/icons/좋아요 비활성_18dp.svg'

const OneDictionaryCard = ({ dict }) => {
  return (
    <>
      <div className="OneDictionaryCardSection">
        <div className="OneDictionaryCardList" key={dict.id} onClick={() => history.push(`/dict/detail/${dict.dictId}`)}>
          <div className="DictListTitle">{dict.title}</div>
          <div className="DictListSummary">{dict.summary}</div>
          <div className="DictWriteInfo">
            <Grid flex_align>
              <EmptyHeartIcon fill=" #878c92" />
              <div className="DictListLikeCount">{dict.likeCount}</div>
            </Grid>
            <Grid flex_end>
              <div className="DictListFirstWriter">{dict.firstWriter}</div>
              <div className="DictListCreatedAt">{dict.createdAt.split('T', 1)}</div>
            </Grid>
          </div>
        </div>
      </div>
    </>
  )
}

export default OneDictionaryCard
