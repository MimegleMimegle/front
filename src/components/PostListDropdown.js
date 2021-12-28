import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const categoryOption = [
    {
      key: '전체 게시글',
      text: '전체 게시글',
      value: '전체 게시글',
    },
    {
      key: '조회 순',
      text: '조회 순',
      value: '조회 순',
    },
    {
      key: '좋아요 순',
      text: '좋아요 순',
      value: '좋아요 순',
    },
]

const PostListDropdown = () => (
  <Dropdown
    placeholder='전체 게시글'
    fluid
    selection
    options={categoryOption}
  />
)

export default PostListDropdown