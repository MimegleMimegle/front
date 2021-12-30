import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import PostCard from '../../components/PostCard'
import { MdPostAdd } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import post, { actionCreators as postActions } from '../../redux/modules/post'
import PostListDropdown from '../../components/PostListDropdown'

const PostList = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()



  const postList = useSelector((state) => state.post.list) // state는 리덕스 스토어의 전체 데이터
  console.log(postList)

  useEffect(() => {
    dispatch(postActions.getPostsDB())
  }, [])

  return (
    <>
      <Container>
        <button
          className="pluspost"
          onClick={() => {
            history.push('/post/write')
          }}
        >
          + 밈 글 등록하기
        </button>
        <PostListDropdown />
        {postList &&
          postList.map((post, index) => {
            return <PostCard post={post} key={post.boardId} />
          })}
      </Container>
    </>
  )
}

export default PostList

const Container = styled.div`
  .pluspost {
    width: 100%;
    margin: 5px 8px 12px 8px;
    border: 2px black solid;
    padding: 10px;
  }
`
