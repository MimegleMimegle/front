import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { boardApi } from '../../shared/api'

/* components & elements */
import HashTag from '../../components/HashTag'
import PostCard from '../../components/PostCard'
import ModalWrapper from '../../components/ModalWrapper'
import ModalContainer from '../../components/ModalContainer'

/* icons */
import { GoSearch } from 'react-icons/go'

/********* 검색된 게시글 정보가 없을 때 보여줄 화면!! 모달이든 뭐든 띄워야함! *********/

const PostSearch = (props) => {
  const hashTag_list = ['스불재', '국그릇핑크퐁', '꾸꾸꾸', '700', '쭈빠삐무네뇨']

  const [hashTags, setHashTags] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [filteredPosts, setFilteredPosts] = React.useState([])
  const [notFound, setNotFound] = React.useState(false)
  console.log(hashTags)
  console.log(filteredPosts)

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const closeNotFountModal = () => {
    setTimeout(() => {
      setNotFound(false)
    }, 2000)
  }

  const clickSearch = () => {
    boardApi
      .searchPost(search)
      .then((response) => {
        console.log(response.data)
        setFilteredPosts(response.data.data)
      })
      .catch((error) => {
        console.log('검색한 게시글 정보를 불러오는 데 문제가 발생했습니다.', error.response)
        if (error.response.status === 404) {
          setNotFound(true)
          closeNotFountModal()
        }
      })
  }

  /* 백엔드에 해시태그 부활 요청 */
  // React.useEffect(() => {
  //   boardApi
  //     .recommendHashTag()
  //     .then((res) => {
  //       console.log(res.data)
  //       setHashTagList(res.data)
  //     })
  //     .catch((err) => {
  //       console.log('해시태그 정보를 불러오는 데 문제가 발생했습니다.', err.response)
  //     })
  // }, [])

  return (
    <>
      <Wrapper>
        <div>
          <div style={{ width: '100%', margin: '10px 0 20px', backgroundColor: '#e8e8e8', borderRadius: '30px', display: 'flex', alignItems: 'center' }}>
            <input type="text" onChange={handleSearch} style={{ width: '100%', padding: '10px 16px', border: 'none', backgroundColor: '#e8e8e8', borderRadius: '30px' }} />
            <button onClick={clickSearch} style={{ height: '100%', padding: '0 16px 0 5px' }}>
              <GoSearch style={{ fontSize: '20px', paddingTop: '2px' }} />
            </button>
          </div>
          <div>
            {/* DB에서 불러온 HashTags list map */}
            <p style={{ fontSize: '9px', padding: '0 0 5px' }}>추천 해시태그</p>
            {hashTag_list.map((hashtag, index) => {
              return <HashTag key={index} hashtag={hashtag} setFilteredPosts={setFilteredPosts} setNotFound={setNotFound} closeNotFountModal={closeNotFountModal} />
            })}
          </div>
          <div>
            {/* 검색어 관련 게시글 목록 잘 불러와지는 지 확인 후 주석 해제 */}
            {filteredPosts.length > 0
              ? filteredPosts.map((post) => {
                  return <PostCard key={post.boardId} {...post} />
                })
              : null}
            <PostCard />
          </div>
        </div>
        {notFound && (
          <ModalWrapper visible={true}>
            <ModalContainer>검색 결과가 없습니다!</ModalContainer>
          </ModalWrapper>
        )}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
`

export default PostSearch
