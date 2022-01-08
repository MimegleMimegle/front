import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { boardApi } from '../../shared/api'
import { useHistory } from 'react-router'

/* components & elements */
import HashTag from '../../components/HashTag'
import PostCard from '../../components/PostCard'
import ModalWrapper from '../../components/ModalWrapper'
import ModalContainer from '../../components/ModalContainer'
import Header from '../../components/Header'

/* icons */
import { GoSearch } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'

const PostSearch = (props) => {
  const history = useHistory()

  const [hashTags, setHashTags] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [filteredPosts, setFilteredPosts] = React.useState([])
  const [notFound, setNotFound] = React.useState(false)
  const [show, setShow] = React.useState(false)

  const searchprops = props.match.params.search
  console.log(search)

  const searchClick = () => {
    show ? setShow(false) : setShow(true)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setShow(true)
  }

  const closeNotFountModal = () => {
    setTimeout(() => {
      setNotFound(false)
    }, 2000)
  }

  const clickSearch = async () => {
    await boardApi
      .searchPost(search)
      .then((response) => {
        console.log(response.data)
        setFilteredPosts(response.data.data)
        setShow(false)

      })
      .catch((error) => {
        console.log('검색한 게시글 정보를 불러오는 데 문제가 발생했습니다.', error.response)
        if (error.response.status === 400) {
          setNotFound(true)
          closeNotFountModal()
        }
      })
  }

  /* 백엔드에 해시태그 부활 요청 */
  React.useEffect(() => {
    boardApi
      .recommendHashTag()
      .then((res) => {
        console.log(res.data.data)
        setHashTags(res.data.data.hashTags)
        setSearch(props.match.params.search)

      })
      .catch((err) => {
        console.log('해시태그 정보를 불러오는 데 문제가 발생했습니다.', err.response)
      })

      boardApi
      .searchPost(props.match.params.search)
      .then((response) => {
        console.log(response.data)
        setFilteredPosts(response.data.data)
        setShow(false)

      })
      .catch((error) => {
        console.log('검색한 게시글 정보를 불러오는 데 문제가 발생했습니다.', error.response)})
  }, [])
 

  return (
    <>
    <Header type="PostList" location="밈+글 커뮤니티">
      <div onClick={()=> {history.push('/post')}} 
               style={{margin: "0 10px 0 0", display:"flex", alignItems:"center",cursor:"pointer"}}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
        </div>
        <IoClose />
      </Header>
      <Wrapper>
          <div style={{ width: '100%', height:'50px', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center',borderBottom:'1px solid black' }} >
          <div style={{ height: '100%', padding: '0 16px 0 5px' }}>
              <GoSearch style={{ fontSize: '13px', margin: '18px 0 18px 18px' }} />
            </div>
            <input placeholder="검색어를 입력해주세요" type="text" onKeyPress={(e)=>{if(e.key === "Enter"){clickSearch()}}} onClick={searchClick} onChange={handleSearch} style={{ width: '100%', padding: '10px 16px', border: 'none', backgroundColor: '#e8e8e8',}} />
          </div>
        {show &&
        <div style={{borderBottom:'1px solid black'}}>
            {/* DB에서 불러온 HashTags list map */}
            <RecommendHashTag>추천 해시태그</RecommendHashTag>
            {hashTags&&hashTags.map((hashtag, index) => {
              return <HashTag key={index} hashtag={hashtag} setFilteredPosts={setFilteredPosts} setNotFound={setNotFound} closeNotFountModal={closeNotFountModal} />
            })}
        </div> }
      </Wrapper>
      <HistoryContainer>"{search}" 에 대한 검색 결과</HistoryContainer>
        <div>
            {/* 검색어 관련 게시글 목록 잘 불러와지는 지 확인 후 주석 해제 */}
            {filteredPosts.length > 0
              ? filteredPosts.map((post) => {
                  return <PostCard key={post.boardId} post={post} />
                  
                }) 
              :<ResultNone>검색 결과가 없습니다.</ResultNone>
            }            
        </div>
        {notFound && (
          <ModalWrapper visible={true}>
            <ModalContainer>검색결과에 오류가 생겼습니다</ModalContainer>
          </ModalWrapper>
        )}
      
    </>
  )
}

const Wrapper = styled.div`
  margin: 0 0 5px 0;
`
const RecommendHashTag = styled.div`
  margin: 10px 0 3px 48px;
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
`;

const HistoryContainer = styled.div`
  padding: 15px 0 12px 16px;
  width: 100%;
  border-bottom:1px solid #E5E5E5;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  align-items: center;
  font-family: 'YdestreetB';
`;

const ResultNone = styled.div`
  padding:16px;
  border-bottom: 1px solid #E5E5E5;
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
`

export default PostSearch;
