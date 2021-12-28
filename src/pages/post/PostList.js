import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import PostCard from '../../components/PostCard'
import { MdPostAdd } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import post, { actionCreators as postActions } from '../../redux/modules/post'

const PostList = (props) => {
  const dispatch = useDispatch()
  // const boardList = useSelector((state) => state.board.list) // state는 리덕스 스토어의 전체 데이터

  const [board, setBoard] = useState([])

  console.log(board)

  useEffect(() => {
    dispatch(postActions.getPostsDB())
  }, [board])

  return (
    <>
      <Container>
        <button className="pluspost">+ 밈 글 등록하기</button>

        {board.map((board) => {
          return (
            <div key={board.Id}>
              <PostCard boardId={board.Id} {...board} />
            </div>
          )
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
  .pluspost {
    width: 100%;
    margin: 5px 8px 12px 8px;
    border: 2px black solid;
    padding: 10px;
  }
`
