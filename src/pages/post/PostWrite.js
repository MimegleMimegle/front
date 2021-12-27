import React, { useState } from 'react'
import { CgEnter } from 'react-icons/cg';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import post, { actionCreators as postActions } from '../../redux/modules/post';

const PostWrite = (props) => {
  
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const changeTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  }

  const changeContent = (e) => {
    setContent(e.target.value);
    console.log(e.target.value);
  }


  const addPost = () => {
    if(title === "" || content === ""){
      window.alert ("제목 혹은 내용을 작성해주세요.");
      return;
    }
    dispatch(postActions.addPostDB(title,content));
    history.replace("/post");

  }

  return (
    <>
      <Container>
        <PWHeader>
        {/* <button className="writectgr">말머리선택</button> */}
        <input className="writetitle" placeholder="제목을 입력하세요" value={title} onChange={changeTitle}/>
        </PWHeader>
        <button>임시저장</button>
        <PWBody>
          <textarea value={content} onChange={changeContent} className="writedesc" placeholder="내용을 입력하세요."></textarea>
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
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    /* border-radius: 10px; */
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
