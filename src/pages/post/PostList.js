import React, { useEffect, useState } from 'react'
import { history } from '../../redux/ConfigureStore'
import styled from 'styled-components'
import PostCard from '../../components/PostCard'
import { MdPostAdd } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import post, { actionCreators as postActions } from '../../redux/modules/post'
import Pagination from 'rc-pagination'
import { boardApi } from '../../shared/api'
import axios from 'axios'
import Header from '../../components/Header'
import { ReactComponent as SearchIcon } from '../../styles/icons/검색_24dp.svg'
import SearchPost from '../../components/SearchPost'
import '../../index.css'


const PostList = (props) => {
  const dispatch = useDispatch()

  const [post, setPost] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [show, setShow] = useState(false)

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

  const searchClick = ()=> {
    show? setShow(false):setShow(true)
  }

  console.log(show)

  return (
    <>
      <Header type="PostList" location="밈+글 커뮤니티">
        <button style={{ padding: '5px 8px 0' }} onClick={searchClick}>
          <SearchIcon />
        </button>
      </Header>
      <Container>
      <SearchPostDiv>  {show && <SearchPost/>} </SearchPostDiv>
        <Wrap>
        <Empty>
          <Addbtn
            onClick={() => {
              history.push('/post/write')
            }}
          >
            밈+글 등록
          </Addbtn>
          <AddbtnShadow />
        </Empty>

        {post &&
          post.map((post, index) => {
            return <PostCard post={post} key={post.boardId} />
          })}

        <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
        </Wrap>
      </Container>
    </>
  )
}

export default PostList

const Container = styled.div`
  position:relative;
  
`;

const SearchPostDiv = styled.div`
  position: absolute;
  z-index:5
`;

const Wrap =styled.div`
  position: absolute;
  
`

const Empty = styled.div`
  border-bottom: 1px solid #e5e5e5;
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
  font-family: 'YdestreetB';
  font-style: normal;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
  margin: 20px 42px 20px 38px;
  padding: 11px 0px;
`

const AddbtnShadow = styled.div`
  width: 280px;
  height: 40px;
  top: 4px;
  right: 38px;
  background-color: white;
  border: 1px solid black;
  position: absolute;

  /* z-index: -1; */
  z-index: -1;
`
