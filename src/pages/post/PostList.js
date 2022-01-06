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
import Header from '../../components/Header'

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
    // dispatch(postActions.getPostsDB())
  }, [currentPage])

  const getPostListDB = async () => {
    let response = await axios.get(`http://54.180.150.230/api/board/list/FREEBOARD?page=${currentPage - 1}&size=${pageSize}`)
    let totalLength = await boardApi.totalLength()
    console.log(response)
    console.log(totalLength)
    setPost(response.data.data)
    setTotalCount(totalLength.data.data)
  }

  console.log(post)
  console.log(totalCount)

  return (
    <>
      <Header type="PostList" location="밈+글 커뮤니티">
      <svg onClick ={()=> {
        history.push('/post/search')
      }}style={{margin: "10px 20px 0 0"}} cursor="pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      </Header>
      <Container>
        <Empty>
        <Addbtn
          onClick={() => {
            history.push('/post/write')
          }}>
           밈+글 등록       
        </Addbtn>
        <AddbtnShadow/>
        </Empty>

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

const Container = styled.div``

const Empty = styled.div`
border-bottom: 1px solid #E5E5E5;
position: relative;

`

const Addbtn = styled.div`
  width: 280px;
  height: 40px;
  background-color: rgba(0, 160, 255, 1);
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-itmes: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
  margin: 20px 42px 20px  38px;
  padding: 12px 105px 13px 106px
  
`;

const AddbtnShadow = styled.div`
  width: 280px;
  height: 40px;
  top:4px;
  right:42px;
  background-color: white;
  border: 1px solid black;
  position: absolute;

  /* z-index: -1; */
  z-index: -1;
`;
