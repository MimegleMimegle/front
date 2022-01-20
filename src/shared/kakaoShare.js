import React from 'react'
import styled from 'styled-components'
import SmileIcon from '../styles/image/smileIcon_Yellow.png'
import kakaoLogo from '../styles/image/kakao-logo.png'

const KakaoShareButton = (props) => {
  const { size, children } = props
  const styles = { size: size }
  React.useEffect(() => {
    createKakaoButton()
  }, [])

  const createKakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao
      const quizIntroUrl = 'http://memegle.xyz/quiz'

      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init('65a77a52d880b0b38abb30f7b4816e82')
      }

      kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: '세상의 모든 밈, 밈글밈글',
          description: '사전. 근데 이제 신조어를 곁들인..',
          imageUrl: 'https://avatars.githubusercontent.com/u/96426012?s=200&v=4', // process.env.FETCH_URL + '/logo.png' 절대경로여야함
          link: {
            mobileWebUrl: quizIntroUrl,
            webUrl: quizIntroUrl,
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
              mobileWebUrl: quizIntroUrl,
              webUrl: quizIntroUrl,
            },
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: quizIntroUrl,
              webUrl: quizIntroUrl,
            },
          },
        ],
      })
    }
  }

  return (
    <button id="kakao-link-btn" style={{ padding: '0 0 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <KakaoLogoImage src={kakaoLogo} {...styles} />
        {children}
      </div>
    </button>
  )
}

KakaoShareButton.defaultProps = {
  size: 52,
}

const KakaoLogoImage = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
`

export { KakaoShareButton }
