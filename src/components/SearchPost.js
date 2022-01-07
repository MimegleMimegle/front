import React from 'react'
import styled from 'styled-components'
import { boardApi } from '../shared/api'
import { useHistory } from 'react-router'

/* components & elements */
import HashTag from './HashTag'

/* icons */
import { GoSearch } from 'react-icons/go'
import {IoClose} from 'react-icons/io5'



/********* 검색된 게시글 정보가 없을 때 보여줄 화면!! 모달이든 뭐든 띄워야함! *********/

const SearchPost = (props) => {
  const history = useHistory();

  const [hashTags, setHashTags] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [filteredPosts, setFilteredPosts] = React.useState([])
  const [notFound, setNotFound] = React.useState(false)

  console.log(hashTags)
  
  
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  console.log(search)
  console.log(filteredPosts)

  const clickSearch = async () => {
    await boardApi
      .searchPost(search)
      .then((response) => {
        console.log(response.data)
        setFilteredPosts(response.data.data)
        history.push({
        pathname:'/post/search/',
        search:search,
        filteredPosts:filteredPosts,
        })
        
      })
      .catch((error) => {
        console.log('검색한 게시글 정보를 불러오는 데 문제가 발생했습니다.', error.response)
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
//   ()=>history.push({
//     pathname:'/post/search',
//     search:search,
//     })
  return (
    <>
      <Wrapper>
        <div>
          <div style={{ width: '100%', height:'50px', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center' ,borderBottom:'1px solid black' }} >
            <div onClick={clickSearch} style={{ height: '100%', padding: '0 16px 0 5px' }}>
              <GoSearch style={{ fontSize: '13px', margin: '18px 0 18px 18px' }} />
            </div>
            <input placeholder="검색어를 입력해주세요" type="text" onKeyPress={(e)=>{if(e.key === "Enter"){clickSearch()}}} onChange={handleSearch} style={{ width: '100%', border: 'none', backgroundColor: '#e8e8e8',}} />
          </div>
          <div>
            {/* DB에서 불러온 HashTags list map */}
            <RecommendHashTag style={{ fontSize: '14px', margin: '10px 0 3px 48px'}}>추천 해시태그</RecommendHashTag>
            {hashTags&&hashTags.map((hashtag, index) => {
              return <HashTag key={index} hashtag={hashtag} setFilteredPosts={setFilteredPosts} setNotFound={setNotFound} />
            })}
          </div>
        </div>
        
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 367px;
  height: 100%;
  border-bottom: 1px solid black;
  background: white;
`

const RecommendHashTag = styled.div`
  margin: 10px 0 3px 48px;
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
`;

export default SearchPost;