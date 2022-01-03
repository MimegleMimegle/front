import React from 'react'
import styled from 'styled-components'
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
          imageUrl:
            'data:image/jpeg;base64,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', // process.env.FETCH_URL + '/logo.png'
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

  return (
    <button id="kakao-link-btn" style={{ padding: '0 0 6px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <KakaoLogoImage src={kakaoLogo} {...styles} />
        {children}
      </div>
    </button>
  )
}

KakaoShareButton.defaultProps = {
  size: 40,
}

const KakaoLogoImage = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
`

export { KakaoShareButton }
