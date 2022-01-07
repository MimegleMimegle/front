import React from 'react'
import styled from 'styled-components'

import { boardApi } from '../shared/api'

const HashTag = (props) => {
  const clickHashTag = () => {
    boardApi
      .searchPost(props.hashtag)
      .then((response) => {
        console.log(response.data)
        props.setFilteredPosts(response.data.data)
      })
      .catch((error) => {
        console.log('해시태그 관련 게시글 정보를 불러오는 데 문제가 발생했습니다.', error.response)
        if (error.response.status === 404 || 400) {
          props.setNotFound(true)
          props.closeNotFountModal()
        }
      })
  }

  return (
    <>
      <HashTagButton onClick={clickHashTag}># {props.hashtag}</HashTagButton>
    </>
  )
}

HashTag.defaultProps = {
  _onClick: () => {},
}

const HashTagButton = styled.button`
  display: flex;
  align-items: center;  
  font-size: 14px;
  margin: 12px 0px 12px 48px;
  padding: 0 10px;
  line-height: 16.8px;  
  /* background-color: #fff8b6; */
  /* display: inline-block; */
  /* border-radius: 20px; */
  /* border: 1px solid #111; */
`

export default HashTag
