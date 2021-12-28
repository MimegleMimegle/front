import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { actionCreators as postActions } from '../../redux/modules/post';
import  {actionCreators as imageActions} from '../../redux/modules/image';
const PostWrite = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbNail, setThumbNail] = useState("");
  // const [preview, setPreview] = useState("");

  // const postList = useSelector((state) => state.post.list);

  // const boardId = props.match.params.id;
  // const { history } = props;

  // const selectPostInfo = postList.filter(
  //   (list) => list.boardId === parseInt(boardId)
  // );

  

  const changeTitle = (e) => {
    setTitle(e.target.value);
  }

  const changeContent = (e) => {
    setContent(e.target.value);
  }


  const addPost = () => {
    if(title === "" || content === ""){
      window.alert ("제목 혹은 내용을 작성해주세요.");
      return;
    }
    dispatch(postActions.addPostDB(title,content,thumbNail));
  }

  // const selectFile = (e) => {
  //   const reader = new FileReader(); // 미리보기 리더
  //   const targetThumbNail = e.target.files[0];
  //   reader.readAsDataURL(targetThumbNail);
  //   setThumbNail(e.target.files[0]);
  //   reader.onloadend = () => {
  //     setPreview(reader.result);

  //     dispatch(imageActions.setPreview(reader.result));
  //     // dispatch(postActions.addPost(reader.result));
  //   };
  // };


  return (
    <>
      <Container>
        <PWHeader>
        <input className="writetitle" placeholder="제목을 입력하세요" value={title} onChange={changeTitle}/>
        </PWHeader>
        <button>임시저장</button>
        <PWBody>
          <textarea value={content} onChange={changeContent} className="writedesc" placeholder="내용을 입력하세요."></textarea>
          {/* <img style={{scr: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"}}/>
          <input onChange={selectFile}>이미지불러오기</input> */}
        </PWBody>
        <PWFooter>
        <button className="postbtn" onClick={() => {addPost()}} >작성하기</button>
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
