import React, { useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import useScript from '../util/useScript'

import Backdrop from '@mui/material/Backdrop'
import BottomPopup from './BottomPopup'
import { ReactComponent as LinkCopyIcon } from '../styles/icons/링크복사_24dp.svg'
import { KakaoShareButton } from '../shared/kakaoShare'
import { KakaoImageShareButton } from '../shared/kakaoImageShare'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share'

const ShareBottomSheet = (props) => {
  const { shareVisible, setShareVisible, type, thumbNail, boardId } = props

  useScript('https://developers.kakao.com/sdk/js/kakao.js')
  const quizIntroUrl = 'http://memeglememegle.s3-website.ap-northeast-2.amazonaws.com/quiz'

  const [copied, setCopied] = useState(false)

  const closeCopied = () => {
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const onCopy = () => {
    setCopied(true)
    closeCopied()
  }

  window.addEventListener('keyup', (e) => {
    if (shareVisible && e.key === 'Escape') {
      setShareVisible(!shareVisible)
    }
  })

  if (type === 'image') {
    return (
      // <Backdrop open={shareVisible} sx={{ zIndex: '10000' }}>
      <BottomPopup shareVisible={shareVisible} setShareVisible={setShareVisible} heightPixel={240}>
        <Container>
          <div className="share share-header">공유하기</div>
          <ShareBody>
            <div className="each-share-container">
              <CopyToClipboard onCopy={onCopy} text={thumbNail}>
                <button className="link-copy-button">
                  <LinkCopyIcon />
                </button>
              </CopyToClipboard>
              <p className="each-share-container__text">링크복사</p>
            </div>
            <div className="each-share-container">
              <KakaoImageShareButton thumbNail={thumbNail} boardId={boardId} />
              <p className="each-share-container__text">카카오톡</p>
            </div>
            <div className="each-share-container">
              <FacebookShareButton url={thumbNail}>
                <FacebookIcon size={52} round={true} />
              </FacebookShareButton>
              <p className="each-share-container__text">페이스북</p>
            </div>
            <div className="each-share-container">
              <TwitterShareButton url={thumbNail}>
                <TwitterIcon size={52} round={true} />
              </TwitterShareButton>
              <p className="each-share-container__text">트위터</p>
            </div>

            <div className="each-share-container">
              <LineShareButton url={thumbNail}>
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
          {copied ? <span className="link-copied">링크 복사 완료!</span> : null}
        </Container>
      </BottomPopup>

      // </Backdrop>
    )
  }

  return (
    <>
      {/* <Backdrop open={shareVisible} sx={{ zIndex: '10000' }}> */}
      <BottomPopup shareVisible={shareVisible} setShareVisible={setShareVisible} heightPixel={240}>
        <Container>
          <div className="share share-header">공유하기</div>
          <ShareBody>
            <div className="each-share-container">
              <CopyToClipboard onCopy={onCopy} text={quizIntroUrl}>
                <button className="link-copy-button">
                  <LinkCopyIcon />
                </button>
              </CopyToClipboard>
              <p className="each-share-container__text">링크복사</p>
            </div>
            <div className="each-share-container">
              <KakaoShareButton />
              <p className="each-share-container__text">카카오톡</p>
            </div>
            <div className="each-share-container">
              <FacebookShareButton url={quizIntroUrl}>
                <FacebookIcon size={52} round={true} />
              </FacebookShareButton>
              <p className="each-share-container__text">페이스북</p>
            </div>
            <div className="each-share-container">
              <TwitterShareButton url={quizIntroUrl}>
                <TwitterIcon size={52} round={true} />
              </TwitterShareButton>
              <p className="each-share-container__text">트위터</p>
            </div>
            <div className="each-share-container">
              <LineShareButton url={quizIntroUrl}>
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
          {copied ? <span className="link-copied">링크 복사 완료!</span> : null}
        </Container>
      </BottomPopup>

      {/* </Backdrop> */}
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* position: absolute; */
  z-index: 10001;
  width: 100%;
  height: 240px;
  left: 0;
  bottom: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);

  .share {
    height: 100%;
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
    }
  }
  .link-copied {
    background-color: ${({ theme }) => theme.colors.black};
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-bottom: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 7px 12px;
    position: absolute;
    width: auto;
    min-width: 50px;
    max-width: 300px;
    word-wrap: break-word;
    z-index: 9999;
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
      color: ${({ theme }) => theme.colors.black};
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
    .link-copy-button {
      width: 52px;
      height: 52px;
      border: 1px solid ${({ theme }) => theme.colors.black};
      border-radius: 30px;
      background-color: ${({ theme }) => theme.colors.line};
      margin: 0 0 8px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export default ShareBottomSheet
