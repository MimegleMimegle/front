import React from 'react'
import styled from 'styled-components'
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'

const PostCard = (props) => {
  return (
    <>
      <Container>
        <text>닉네임+아이디</text>
        <PostBody>
          <img className="uploadimg" src="https://i.pinimg.com/564x/38/9a/01/389a01e78d98f7bdb4304b7980b69a22.jpg" alt="" />
          <div className="listtitle">
            <text>Title</text> <br />
            <text>Contents</text>
          </div>
          <text>#tag1 #tag2 #teg3</text>
        </PostBody>
        <AiOutlineEye /> 조회수 <AiOutlineHeart /> 좋아요수
      </Container>
    </>
  )
}

export default PostCard

const Container = styled.div`
  background: red;
`

const PostBody = styled.div`
  width: 100%;
  height: auto;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .listtitle {
    margin: 5px 10px;
  }
  .uploadimg {
    width: 70px;
    height: 70px;
  }
`
