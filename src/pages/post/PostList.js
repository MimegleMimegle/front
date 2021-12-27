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

  const token = localStorage.getItem("token") ? true : false;

  const [posts, setPosts] = useState([])


  useEffect(() => {
    dispatch(postActions.getPostsDB());
  }, []);

  // 해당 게시물로 이동
  const postDetail = (postId) => {
    console.log("게시물 페이지 이동");
    history.push("/post/" + postId);
  };

  // if (!token) {
  //   window.alert("로그인 후 이용 가능합니다.");
  //   history.replace("/");
  // }
  const loginCheck = () => {
    if (!token) {
      window.alert('로그인 후 작성이 가능합니다.')
      return ;
    } else { 
      history.push("/post/write");
      }
  }

  return (
    <>
      <Container>
        <button onClick={loginCheck}>+ 밈 글 등록하기</button>

        {posts.map((post, key) => {
          
              return (
                <PostCard key={key} posts={post} />
              )
            })}
       <PostCard  />
      </Container>
    </>
  )
}

export default PostList

const Container = styled.div``
