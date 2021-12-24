import React, { useState } from 'react'
import { useHistory, useParams, } from 'react-router'
import styled from 'styled-components'
import PostlistSlider from '../../components/PostlistSlide';
import PostCard from '../../components/PostCard'
import { MdPostAdd } from "react-icons/md";
import { useSelector } from 'react-redux';

const PostList = (props) => {
  const is_login = useSelector((state)=> state.user.is_login)

  const history = useHistory();
  
  return (
    <>
    <PostHeader>
        {/* 전체공지는 맨위에 고정시켜놓고 항목을 없애는건 어떨까 헤더처럼 위치 고정
          즐겨찾기는 마이페이지에 옮기는게 어떨까
          인기글의 기준은 무엇인가 좋아요인가 조회수인가 */}
        <button>전체글</button>
        <button>인기글</button>
        <button>즐겨찾기</button>
        <button>전체공지</button>
      </PostHeader>
      <div style={{height:"100px"}}>
      <PostlistSlider/>
      </div>
      <PostCard  />
      <IconBorder onClick={()=> {history.push("/post/write");}}><MdPostAdd size="30px"/></IconBorder>
    </>
  )
}

export default PostList

const Container = styled.div`
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
 
 span {
   padding: 5px;
   margin: 10px;
   font-size: 15px;
 }

`;

const IconBorder = styled.div`
  width:50px;
  height:50px;
  border: 1px solid black;
 padding: 10px;
 border-radius:40px;
 position: absolute;
 right: 10px;
 bottom:100px;
 cursor: pointer;

 &:hover {
   background-color: lightgray;
 }
`;