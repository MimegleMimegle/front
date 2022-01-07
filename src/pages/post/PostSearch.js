// import React from 'react'
// import styled from 'styled-components'
// import { useDispatch, useSelector } from 'react-redux'
// import { boardApi } from '../../shared/api'
// import { useHistory } from 'react-router'

// /* components & elements */
// import HashTag from '../../components/HashTag'
// import PostCard from '../../components/PostCard'
// import ModalWrapper from '../../components/ModalWrapper'
// import ModalContainer from '../../components/ModalContainer'
// import Header from '../../components/Header'

// /* icons */
// import { GoSearch } from 'react-icons/go'
// import {IoClose} from 'react-icons/io5'

// /********* 검색된 게시글 정보가 없을 때 보여줄 화면!! 모달이든 뭐든 띄워야함! *********/

// const PostSearch = (props) => {
//   const history = useHistory();

//   const [hashTags, setHashTags] = React.useState([])
//   const [search, setSearch] = React.useState('')
//   const [filteredPosts, setFilteredPosts] = React.useState([])
//   const [notFound, setNotFound] = React.useState(false)

//   console.log(hashTags)
//   console.log(filteredPosts)

//   const handleSearch = (e) => {
//     setSearch(e.target.value)
//   }

//   const closeNotFountModal = () => {
//     setTimeout(() => {
//       setNotFound(false)
//     }, 2000)
//   }

//   const clickSearch = async () => {
//     await boardApi
//       .searchPost(search)
//       .then((response) => {
//         console.log(response.data)
//         setFilteredPosts(response.data.data)
//       })
//       .catch((error) => {
//         console.log('검색한 게시글 정보를 불러오는 데 문제가 발생했습니다.', error.response)
//         if (error.response.status === 404) {
//           setNotFound(true)
//           closeNotFountModal()
//         }
//       })
//   }

//   /* 백엔드에 해시태그 부활 요청 */
//   React.useEffect(() => {
//     boardApi
//       .recommendHashTag()
//       .then((res) => {
//         console.log(res.data.data)
//         setHashTags(res.data.data.hashTags)
//       })
//       .catch((err) => {
//         console.log('해시태그 정보를 불러오는 데 문제가 발생했습니다.', err.response)
//       })
//   }, [])

//   return (
//     <>
//     <Header type="PostList" location="밈+글 커뮤니티">
//       <div onClick={()=> {history.goBack()}}
//           style={{margin: "0 10px 0 0", display:"flex", alignItems:"center",cursor:"pointer"}}>
//         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
//           <path d="M0 0h24v24H0V0z" fill="none"/>
//           <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
//         </svg>
//         </div>
//       <IoClose/>
//       </Header>
//       <Wrapper>
//         <div>
//           <div style={{ width: '100%', margin: '10px 0 20px', backgroundColor: '#e8e8e8', borderRadius: '30px', display: 'flex', alignItems: 'center' }}>
//             <input placeholder="검색어를 입력해주세요" type="text" onChange={handleSearch} style={{ width: '100%', padding: '10px 16px', border: 'none', backgroundColor: '#e8e8e8', borderRadius: '30px' }} />
//             <button onClick={clickSearch} style={{ height: '100%', padding: '0 16px 0 5px' }}>
//               <GoSearch style={{ fontSize: '20px', paddingTop: '2px' }} />
//             </button>
//           </div>
//           <div>
//             {/* DB에서 불러온 HashTags list map */}
//             <p style={{ fontSize: '14px', padding: '0 0 5px' }}>추천 해시태그</p>
//             {hashTags&&hashTags.map((hashtag, index) => {
//               return <HashTag key={index} hashtag={hashtag} setFilteredPosts={setFilteredPosts} setNotFound={setNotFound} closeNotFountModal={closeNotFountModal} />
//             })}
//           </div>
//           <div>
//             {/* 검색어 관련 게시글 목록 잘 불러와지는 지 확인 후 주석 해제 */}
//             {filteredPosts.length > 0
//               ? filteredPosts.map((post) => {
//                   return <PostCard key={post.boardId} post={post} />
//                 })
//               : <HistoryContainer>관련 검색 결과가 없습니다.</HistoryContainer>}
//           </div>
//         </div>

//         {notFound && (
//           <ModalWrapper visible={true}>
//             <ModalContainer>검색결과에 오류가 생겼습니다</ModalContainer>
//           </ModalWrapper>
//         )}
//       </Wrapper>
//     </>
//   )
// }

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   padding: 0 20px;
// `

// const HistoryContainer = styled.div`
//   padding: 0 50px 10px 50px;
//   width: 100%;
// `

// export default PostSearch

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

/********* 검색된 게시글 정보가 없을 때 보여줄 화면!! 모달이든 뭐든 띄워야함! *********/

const PostSearch = (props) => {
  const history = useHistory()

  const [hashTags, setHashTags] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [filteredPosts, setFilteredPosts] = React.useState([])
  const [notFound, setNotFound] = React.useState(false)
  const [show, setShow] = React.useState(false)

  console.log(hashTags)
  console.log(filteredPosts)
  console.log(search)
  console.log(props.location.filteredPosts)

  const searchClick = () => {
    show ? setShow(false) : setShow(true)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
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
      })
      .catch((err) => {
        console.log('해시태그 정보를 불러오는 데 문제가 발생했습니다.', err.response)
      })
  }, [])
  React.useEffect(() => {
    // setFilteredPosts(props.location.filteredPost[0])
  })

  return (
    <>
      <Header type="PostList" location="밈+글 커뮤니티">
        <div
          onClick={() => {
            history.goBack()
          }}
          style={{ margin: '0 10px 0 0', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </div>
        <IoClose />
      </Header>
      <Wrapper>
        <div>
          <div style={{ width: '100%', height: '50px', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center', borderBottom: '1px solid black' }} conClick={searchClick}>
            <input placeholder="검색어를 입력해주세요" type="text" onChange={handleSearch} style={{ width: '100%', padding: '10px 16px', border: 'none', backgroundColor: '#e8e8e8' }} />
            <button onClick={clickSearch} style={{ height: '100%', padding: '0 16px 0 5px' }}>
              <GoSearch style={{ fontSize: '13px', margin: '18px 0 18px 18px' }} />
            </button>
          </div>
          <div>
            {/* DB에서 불러온 HashTags list map */}
            <p style={{ fontSize: '14px', padding: '0 0 5px' }}>추천 해시태그</p>
            {hashTags &&
              hashTags.map((hashtag, index) => {
                return <HashTag key={index} hashtag={hashtag} setFilteredPosts={setFilteredPosts} setNotFound={setNotFound} closeNotFountModal={closeNotFountModal} />
              })}
          </div>
          <div>
            {/* 검색어 관련 게시글 목록 잘 불러와지는 지 확인 후 주석 해제 */}
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => {
                return <PostCard key={post.boardId} post={post} />
              })
            ) : (
              <HistoryContainer>" {search} "에 대한 검색 결과</HistoryContainer>
            )}
          </div>
        </div>

        {notFound && (
          <ModalWrapper visible={true}>
            <ModalContainer>검색결과에 오류가 생겼습니다</ModalContainer>
          </ModalWrapper>
        )}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const HistoryContainer = styled.div`
  padding: 0 50px 10px 50px;
  width: 100%;
  borderbottom: 1px solid #e5e5e5;
`

export default PostSearch
