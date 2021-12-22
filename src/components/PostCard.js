import React from "react"
import styled from "styled-components"

const PostCard = (props) => {
    return (
      <>
        
      <PostBody>
      <div className="listtitle">
        <text>Title</text> <br/>
        <text>작성자</text>
      </div>
        {/* 사진이 포함된 게시글이면 옆에 작게 이미지를 띄워준다?? */}
        <img className= "uploadimg"src="https://i.pinimg.com/564x/38/9a/01/389a01e78d98f7bdb4304b7980b69a22.jpg" alt=""/>
      </PostBody>
      </>
    )
  }
  
  export default PostCard;
  


const PostBody = styled.div`
    
  width: 100%;
  height:auto;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color:red;
  

  .listtitle{
      margin: 5px 10px
  }
  .uploadimg{
    width: 70px;
    height: 70px;
    }
`;