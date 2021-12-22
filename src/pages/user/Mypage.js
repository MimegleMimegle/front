import React from 'react'
import './Mypage.css'
import { MdFace } from 'react-icons/md'

const Mypage = (props) => {
  return (
    <>
      <div className="MypageLayout">
        <div className="UserProfileBox">
          <div className="UserProfileTag">
            <MdFace className="UserProfileImage" fontSize="50"></MdFace>
            <text className="UserProfileName">Username</text>
          </div>
          <div className="UserActivityInfo">
            <div className="UserMyPostTag">
              <text className="UserMyPost">내가 쓴 게시물</text>
              <text className="UserMyPostCount">10개</text>
            </div>
            <div className="UserGetMyLikeTag">
              <text className="UserGetMyLike">내가 받은 좋아요</text>
              <text className="USerGetMyLikeCount">3개</text>
            </div>
          </div>
          <button className="UserProfileUpdateButton">프로필 수정</button>
        </div>
      </div>
    </>
  )
}

export default Mypage
