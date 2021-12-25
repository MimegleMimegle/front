import React from 'react'
import '../../styles/css/Mypage.css'

const Mypage = (props) => {
  return (
    <>
      <div className="MypageLayout">
        <div className="UserProfileBox">
          <div className="UserProfileImage" />
          <div className="userProfileNameTag">
            <text className="UserProfileName">Username</text>
            <div className="VerticalLine" />
            <text className="UserProfileAge">20대</text>
          </div>
          <div className="UserActivityInfo">
            <div className="UserMyDictTag">
              <text className="UserMyDict">단어</text>
              <text className="UserMyDictCount">5개</text>
            </div>
            <div className="UserMyPostTag">
              <text className="UserMyPost">게시물</text>
              <text className="UserMyPostCount">10개</text>
            </div>
            <div className="UserGetMyLikeTag">
              <text className="UserGetMyLike">좋아요</text>
              <text className="USerGetMyLikeCount">3개</text>
            </div>
          </div>
        </div>
        <div className="UserMyPostList">
          <div className="UserMyPostListButton1">전체</div>
          <div className="UserMyPostListButton2">최신순</div>
        </div>
        <div className="UserMyPostListCard">
          <div>어쩔티비 저쩔티비</div>
        </div>
        <div className="UserMyPostListCard">
          <div>어쩔티비 저쩔티비</div>
        </div>
        <div className="UserMyPostListCard">
          <div>어쩔티비 저쩔티비</div>
        </div>
        <div className="UserMyPostListCard">
          <div>어쩔티비 저쩔티비</div>
        </div>
        <div className="UserMyPostListCard">
          <div>어쩔티비 저쩔티비</div>
        </div>
      </div>
    </>
  )
}

export default Mypage
