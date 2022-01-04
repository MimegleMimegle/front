import React, { useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSpring, animated } from 'react-spring'

import ModalWrapper from './ModalWrapper'

import { KakaoShareButton } from '../shared/kakaoShare'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share'

const ShareBottomSheet = ({ bottomSheetVisible, setBottomSheetVisible }) => {
  const currentUrl = window.location.href

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

  return (
    <>
      <ModalWrapper visible={true}>
        <Container className={`${bottomSheetVisible ? 'open' : ''}`}>
          <div style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FacebookShareButton url={currentUrl}>
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={currentUrl}>
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
            <KakaoShareButton />
            <LineShareButton url={currentUrl}>
              <LineIcon size={40} round={true} />
            </LineShareButton>
            <CopyToClipboard onCopy={onCopy} text={currentUrl}>
              <button className="share-btn">URL</button>
            </CopyToClipboard>
          </div>
        </Container>
        {copied ? <span className="link-copied">링크 복사 완료!</span> : null}
      </ModalWrapper>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  top: 100%;
  left: 0;
  /* right: 0; */
  /* bottom: 0; */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: 100px;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  &.open {
    bottom: 0;
  }
`

export default ShareBottomSheet
