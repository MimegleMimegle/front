import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import post, { actionCreators as postActions } from '../../redux/modules/post';
import  {actionCreators as imageActions} from '../../redux/modules/image';
import { boardApi } from '../../shared/api';


const PostEdit = (props) => {

  const fileInput = React.useRef();
  const dispatch = useDispatch();
  const { history } = props;


  const postList = useSelector((state) => state.post.list);
  const boardId = props.match.params.id;

  const selectPostInfo = postList.filter(
    (list) => list.boardId === parseInt(boardId)
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbNail, setThumbNail] = useState("");
  const [preview, setPreview] = useState("");

  const changeTitle = (e) => {
    setTitle(e.target.value);
  }

  const changeContent = (e) => {
    setContent(e.target.value);
  }

  const selectFile = (e) => {
    const reader = new FileReader(); // 미리보기 리더
    const targetThumbNail = fileInput.current.files[0];
    reader.readAsDataURL(targetThumbNail);
    setThumbNail(e.target.files[0]);
    reader.onloadend = () => {
      setPreview(reader.result);
  
      dispatch(imageActions.setPreview(reader.result));
      // dispatch(postActions.addPost(reader.result));
    };
  };

  const editPost = () => {

    dispatch(postActions.editPostDB(thumbNail, title,content, boardId));
  };

  return (
    <>
      <Container>
        <PWHeader>
          <input value={title} onChange={changeTitle} className="writetitle" placeholder="수정할 제목을 입력하세요" />
        </PWHeader>
        {/* <button>임시저장</button> */}
        <PWBody>
        <ContentBox
              defaultValue={selectPostInfo[0] && selectPostInfo[0].content}
              onChange={changeContent}
              label="게시글 내용"
              placeholder="문구 수정 입력..."
              multiLine
            />     
            {/* <img src={preview? preview: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"}/>
            <input ref={fileInput} onChange={selectFile}>이미지불러오기</input>
             */}

        </PWBody>
        <PWFooter>
        <button className="postbtn" onClick={editPost} >작성하기</button>
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

const ContentBox = styled.textarea`

`

export default PostEdit
