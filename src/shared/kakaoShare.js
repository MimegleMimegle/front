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
        kakao.init('65a77a52d880b0b38abb30f7b4816e82')
      }

      kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
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
          likeCount: 77,
          commentCount: 55,
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

  return <button id="kakao-link-btn">카카오톡</button>
}

export { KakaoShareButton }
