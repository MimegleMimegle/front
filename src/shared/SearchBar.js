import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { actionCreators as dictActions } from '../redux/modules/dict'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { dictApi } from '../shared/api'

function SearchBar({ onAddKeyword }) {
  const dispatch = useDispatch()

  const [data, setData] = useState([])

  const [dict, setDict] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [keyword, setKeyword] = useState('')

  const searchDictDB = async () => {
    let completed = false
    let response = await axios(`/api/dict/search?q=${encodeURIComponent(keyword)}&page=${pageSize * (currentPage - 1)}&size=${pageSize}`)
    if (!completed) {
      setData(response.data)
      console.log(response)
      console.log(keyword)
    }
    return () => {
      completed = true
    }
  }

  const handleKeyword = (e) => {
    setKeyword(e.target.value)
  }

  const handleEnter = (e) => {
    if (keyword && e.keyCode === 13) {
      //엔터일때 부모의 addkeyword에 전달
      onAddKeyword(keyword)
      setKeyword('')
      searchDictDB(encodeURIComponent(keyword))
    }
  }

  const handleClearKeyword = () => {
    setKeyword('')
  }

  //느낌표로 키워드를 갖고있냐 없냐로 boolean 형태로 나옴
  //키워드를 가지고 있다면 active가 발생하여 padding이 발생함. // 패딩이 없으면 x 아이콘까지 글자가 침법하기 때문
  const hasKeyword = !!keyword

  {
    //keyword가 있으면 true, 없으면 false가 리턴이 되는 것을 확인 할 수 있습니다
    console.log(!!keyword)
  }

  return (
    <Container>
      <InputContainer>
        <Input placeholder="검색어를 입력해주세요" active={hasKeyword} value={keyword} onChange={handleKeyword} onKeyDown={handleEnter} />
        {keyword && <RemoveIcon onClick={handleClearKeyword} />}
      </InputContainer>
    </Container>
  )
}

const horizontalCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const Container = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 2px solid #0bde8b;
  background-color: #fff;
  padding: 20px 60px;
  box-sizing: border-box;
`

//글자를 입력하면 RemoveIcon이 나오게 되고 누르면 input의 value값이 사라집니다
const RemoveIcon = styled.span`
  ${horizontalCenter}
  right: 10px;
  width: 20px;
  height: 20px;
  background-position: -389px -29px;
  display: inline-block;
  overflow: hidden;
  color: transparent;
  vertical-align: top;
  background-image: url(https://s.pstatic.net/static/www/m/uit/2020/sp_search.623c21.png);
  background-size: 467px 442px;
  background-repeat: no-repeat;
`

const InputContainer = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  background-color: #fff;
  font-weight: 500;
  font-size: 14px;
  box-sizing: border-box;

  ${({ active }) =>
    active &&
    `
    padding-right: 30px; 
  `}
`

export default SearchBar
