import React from 'react'
import { CgEnter } from 'react-icons/cg'
import styled from 'styled-components'

const PostEdit = (props) => {
  return (
    <>
      <Container>
        <PWHeader>
          <button className="writectgr">말머리선택</button>
          <input className="writetitle" placeholder="제목을 입력하세요" />
        </PWHeader>
        <PWBody>
          <button className="plustfuction">사진</button>
          <button className="plustfuction">동영상</button>
          <button className="plustfuction">sns공유</button>
          <button className="plustfuction">스티커</button>

          <textarea className="writedesc" />
        </PWBody>
        <PWFooter>
          <button className="postbtn">수정하기</button>
          <button className="postbtn">뒤로가기</button>
        </PWFooter>
      </Container>
    </>
  )
}

const Container = styled.div`
  margin: 10px 20px;
`

const PWHeader = styled.div`
  display: flex;

  .writectgr {
    width: 100px;
  }
  .writetitle {
    border: 1px solid lightgray;
    border-radius: 10px;
    width: 200px;
  }
`

const PWBody = styled.div`
  margin: 10px 0px;
  .plustfuction {
    margin: 0px 15px 10px 15px;
  }
  .writedesc {
    width: 300px;
    height: 350px;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
`

const PWFooter = styled.div`
  display: flex;
  justify-content: center;
  .postbtn {
    width: 100px;
    pading: 2px;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin: 0px 5px;
  }
`

export default PostEdit
