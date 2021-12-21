import React from 'react'
import { useHistory, useParams, } from 'react-router'
import styled from 'styled-components'
import PostCard from '../../components/PostCard'

const PostList = (props) => {
  const {postID} = useParams();
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
      
      <PostCard onClick />

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