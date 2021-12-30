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
        if (error.response.status === 404) {
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
  display: inline-block;
  font-size: 14px;
  /* background-color: #fff8b6; */
  border: 1px solid #111;
  margin: 0px 10px 10px 0px;
  padding: 0 10px;
  border-radius: 20px;
  line-height: 27px;
`

export default HashTag
