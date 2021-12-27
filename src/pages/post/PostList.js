import React, { useEffect, useState } from 'react'
import { useHistory, useParams, } from 'react-router'
import styled from 'styled-components'
import PostlistSlider from '../../components/PostlistSlide'
import PostCard from '../../components/PostCard'
import { MdPostAdd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import post, { actionCreators as postActions } from '../../redux/modules/post';


const PostList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(postActions.getPostsDB());
  }, []);
  
  const params = useParams();
  console.log(params);

  const postlist = useSelector((state) => state.post.postlist);
  console.log(postlist);


  // 해당 게시물로 이동
  const postDetail = (boardId) => {
    console.log("게시물 페이지 이동");
    history.push("/post/" + boardId);
  };

  return (
    <>
      <Container>
        <button>+ 밈 글 등록하기</button>

        {/* {postlist.map((post, inx) => {
              return ;
              (
                <PostCard key={post.boardId}
                postlist={post}

                 />
              )
            })} */}
       <PostCard  />
      </Container>
    </>
  )
}

export default PostList

const Container = styled.div``
