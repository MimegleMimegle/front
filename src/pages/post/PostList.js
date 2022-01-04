import React, { useEffect, useState } from 'react'
import { history } from '../../redux/ConfigureStore'
import styled from 'styled-components'
import PostCard from '../../components/PostCard'
import { MdPostAdd } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import post, { actionCreators as postActions } from '../../redux/modules/post'
import Pagination from 'rc-pagination'
import SearchPage from '../../shared/SearchPage'
import { boardApi } from '../../shared/api'
import axios from 'axios'

const PostList = (props) => {
  const dispatch = useDispatch()

  const [post, setPost] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const postList = useSelector((state) => state.post.list) // state는 리덕스 스토어의 전체 데이터
  console.log(postList)

  useEffect(() => {
    getPostListDB()
    dispatch(postActions.getPostsDB())
  }, [currentPage])

  console.log(post)
  console.log(totalCount)

  const getPostListDB = async () => {
    let response = await axios.get(`http://52.78.155.185/api/board/list/FREEBOARD?page=${(currentPage - 1)}&size=${pageSize}`)
    let totalLength = await boardApi.totalLength()
    console.log(response)
    console.log(totalLength) 
    setPost(response.data.data)
    setTotalCount(totalLength.data.data)
  }

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

        {post &&
          post.map((post, index) => {
            return <PostCard post={post} key={post.boardId} />
          })}

        <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
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
