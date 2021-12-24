import React from 'react'

const KakaoShareButton = () => {
  React.useEffect(() => {
    createKakaoButton()
  }, [])

  const createKakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao

      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.REACT_APP_KAKAO_API_KEY)
      }

      kakao.Link.createKakaoButton({
        container: '.kakao-share-btn',
        objectType: 'feed',
        content: {
          title: '신조어 퀴즈',
          description: '#밈글밈글 #신조어 #퀴즈',
          imageUrl: 'image_url', // process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        social: {
          likeCount: 0,
          commentCount: 0,
          shareCount: 0,
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      })
    }
  }

  return <button className="kakao-share-button">카카오톡</button>
}

export { KakaoShareButton }
