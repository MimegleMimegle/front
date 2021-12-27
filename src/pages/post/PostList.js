import React, { useEffect, useState } from 'react'
import { useHistory, useParams, } from 'react-router'
import styled from 'styled-components'
import PostCard from '../../components/PostCard'
import { MdPostAdd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import post, { actionCreators as postActions } from '../../redux/modules/post';


const PostList = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list); // state는 리덕스 스토어의 전체 데이터
  console.log(postList)

  useEffect(() => {
    dispatch(postActions.getPostsDB());
  }, []);

  return (
    <>
      <Container>
        <button className="pluspost">+ 밈 글 등록하기</button>

        {postList.map((p,idx)=>{
          return (
          <div  key={p.boardId}>  
          <PostCard p={p} boardId={p.boardId} {...p}/>
          </div>)
        })}
        {/* {/* {post_list.map((p,key)=> {
          return <PostCard key={p.boardId} {...p} />
        })} */}
       {/* <PostCard  /> */}
      </Container>
    </>
  )
}

export default PostList

const Container = styled.div`
  
  .pluspost{
    width:100%;
    margin: 5px 8px 12px 8px;
    border: 2px black solid;
    padding: 10px;

  }
`
