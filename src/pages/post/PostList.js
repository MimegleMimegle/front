import React, { useState } from 'react'
import { useHistory, useParams, } from 'react-router'
import styled from 'styled-components'
import PostlistSlider from '../../components/PostlistSlide'
import PostCard from '../../components/PostCard'
import { MdPostAdd } from "react-icons/md";
import { useSelector } from 'react-redux';

const PostList = (props) => {
  const is_login = useSelector((state)=> state.user.is_login)

  const history = useHistory();
  return (
    <>
      <Container>
        <button>+ 밈 글 등록하기</button>
      <PostCard  />
      <IconBorder onClick={()=> {history.push("/post/write");}}><MdPostAdd size="30px"/></IconBorder>
      </Container>
    </>
  )
}

export default PostList

const Container = styled.div``


const IconBorder = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  padding: 10px;
  border-radius: 40px;
  position: absolute;
  right: 10px;
  bottom: 100px;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`
