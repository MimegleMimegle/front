import React from 'react'
import { useHistory, useParams, } from 'react-router'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import PostlistSlider from '../../components/PostlistSlide';
import PostCard from '../../components/PostCard'
import { MdPostAdd } from "react-icons/md";

const PostList = (props) => {

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
      <Link to="/post/write">
      <IconBorder><MdPostAdd size="30px"/></IconBorder>
      </Link>
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