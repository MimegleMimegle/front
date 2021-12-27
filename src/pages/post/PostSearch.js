import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { boardApi } from '../../shared/api'

/* components & elements */
import HashTag from '../../components/HashTag'

/* icons */
import { GoSearch } from 'react-icons/go'

const PostSearch = (props) => {
  const [hashTag, setHashTag] = React.useState([])

  const hashTag_list = ['스불재', '국그릇핑크퐁', '꾸꾸꾸', '700', '쭈빠삐무네뇨']

  /* 백엔드에 해시태그 부활 요청 */
  // React.useEffect(() => {
  //   boardApi
  //     .recommendHashTag()
  //     .then((res) => {
  //       console.log(res.data)
  //       setHashTag(res.data)
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
            <input type="text" style={{ width: '100%', padding: '10px 16px', border: 'none', backgroundColor: '#e8e8e8', borderRadius: '30px' }} />
            <button style={{ height: '100%', padding: '0 16px 0 5px' }}>
              <GoSearch style={{ fontSize: '20px', paddingTop: '2px' }} />
            </button>
          </div>
          <div>
            {/* DB에서 불러온 HashTag list map */}
            {hashTag_list.map((hashtag, index) => {
              return <HashTag key={index} hashtag={hashtag} />
            })}
          </div>
        </div>
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
