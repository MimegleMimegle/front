import React, { useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import useScript from '../util/useScript'

import BottomPopup from './BottomPopup'
import AlertModal from './modal/AlertModal'
import { ReactComponent as LinkCopyIcon } from '../styles/icons/링크복사_24dp.svg'
import { KakaoShareButton } from '../shared/kakaoShare'
import { KakaoImageShareButton } from '../shared/kakaoImageShare'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share'

const ShareBottomSheet = (props) => {
  const { shareVisible, setShareVisible, type, thumbNail, boardId } = props

  useScript('https://developers.kakao.com/sdk/js/kakao.js')
  const quizIntroUrl = 'http://memeglememegle.s3-website.ap-northeast-2.amazonaws.com/quiz'

  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false)
    }, 2000)
  }

  const onCopy = () => {
    setShowModal(true)
    closeModal()
  }

  return (
    <>
      <BottomPopup isOpen={shareVisible} onClose={() => setShareVisible(false)} heightPixel={200}>
        <Container>
          <div className="share share-header">공유하기</div>
          <ShareBody>
            <div className="each-share-container">
              <CopyToClipboard onCopy={onCopy} text={type === 'image' ? thumbNail : quizIntroUrl}>
                <button className="link-copy-button">
                  <LinkCopyIcon />
                </button>
              </CopyToClipboard>
              <p className="each-share-container__text">링크복사</p>
            </div>
            <div className="each-share-container">
              {type === 'image' ? <KakaoImageShareButton thumbNail={thumbNail} boardId={boardId} /> : <KakaoShareButton />}
              <p className="each-share-container__text">카카오톡</p>
            </div>
            <div className="each-share-container">
              <FacebookShareButton url={type === 'image' ? thumbNail : quizIntroUrl}>
                <FacebookIcon size={52} round={true} />
              </FacebookShareButton>
              <p className="each-share-container__text">페이스북</p>
            </div>
            <div className="each-share-container">
              <TwitterShareButton url={type === 'image' ? thumbNail : quizIntroUrl}>
                <TwitterIcon size={52} round={true} />
              </TwitterShareButton>
              <p className="each-share-container__text">트위터</p>
            </div>
            <div className="each-share-container">
              <LineShareButton url={type === 'image' ? thumbNail : quizIntroUrl}>
                <LineIcon size={52} round={true} />
              </LineShareButton>
              <p className="each-share-container__text">라인</p>
            </div>
          </ShareBody>
          <div className="share share-footer">
            <button className="share-footer__close-button" onClick={() => setShareVisible(!shareVisible)}>
              닫기
            </button>
          </div>
          {showModal && (
            <AlertModal showModal={showModal}>
              <AlertText>링크 복사 완료!</AlertText>
            </AlertModal>
          )}
        </Container>
      </BottomPopup>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  width: 100%;
  height: 200px;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);

  .share {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .share-header {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    cursor: default;
  }
  .share-footer {
    .share-footer__close-button {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      cursor: pointer;
      transition: color 0.3s ease-in-out;
      &:hover {
        color: ${({ theme }) => theme.colors.blue};
      }
    }
  }
`

const ShareBody = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  .each-share-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .each-share-container__text {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
  .link-copy-button {
    width: 52px;
    height: 52px;
    border-radius: 60px;
    margin: 0 0 8px;
    background-color: ${({ theme }) => theme.colors.line};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const AlertText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

export default ShareBottomSheet
