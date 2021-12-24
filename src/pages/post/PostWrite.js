import React, { useState } from 'react'
import { CgEnter } from 'react-icons/cg';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import post, { actionCreators as postActions } from '../../redux/modules/post';
const PostWrite = (props) => {
  
  const dispatch = useDispatch();

  const[ content, setContent] = useState("");
  const [title, setTitle] = useState("");


  const changeContent = (e) => {
    setContent(e.target.value);
  }
  console.log(content);

  const changeTitle = (e) => {
    setTitle(e.target.value);
  }
  console.log(title);

  const addPost = () => {
    dispatch(postActions.addPostDB(post));
  }

  return (
    <>
      <Container>
        <PWHeader>
        <button className="writectgr">말머리선택</button>
        <input className="writetitle" placeholder="제목을 입력하세요" value={post.title} onChange={changeTitle}/>
        </PWHeader>
        <PWBody>
          {/* 사진 동영상을 하나로 합치고 아이콘으로 하는게 좋을거같다 스티커는 뭘까! */}
          <button className="plustfuction">사진</button>
          <button className="plustfuction">동영상</button>
          <button className="plustfuction">sns공유</button>
          <button className="plustfuction">스티커</button>

          <textarea value={post.content} onChange={changeContent} className="writedesc"/>
        </PWBody>
        <PWFooter>
        <button className="postbtn" onClick={addPost} >작성하기</button>
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
    pading: 20px;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
`

export default PostWrite
