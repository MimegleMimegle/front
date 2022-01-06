import React from 'react'
import styled from 'styled-components'
import useScript from '../../util/useScript'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { KakaoShareButton } from '../../shared/kakaoShare'
import { IoCloseOutline } from 'react-icons/io5'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share'

const ShareMenu = ({ handleShareToggleMenu, imageUrl }) => {
  useScript('https://developers.kakao.com/sdk/js/kakao.js')

  const [copied, setCopied] = React.useState(false)

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
      <ShareToggleMenu>
        <div style={{ width: '100%', padding: '5px 5px', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
          <button style={{ padding: '0', height: '100%' }} onClick={handleShareToggleMenu}>
            <IoCloseOutline style={{ fontSize: '18px', color: '#111' }} />
          </button>
        </div>
        <EachMenu>
          <FacebookShareButton url={imageUrl}>
            <div className="each-menu_shareBox">
              <FacebookIcon size={20} round={true} />
              <span className="each-menu_shareBox_shareText">공유하기</span>
            </div>
          </FacebookShareButton>
        </EachMenu>
        <EachMenu>
          <TwitterShareButton url={imageUrl}>
            <div className="each-menu_shareBox">
              <TwitterIcon size={20} round={true} />
              <span className="each-menu_shareBox_shareText">공유하기</span>
            </div>
          </TwitterShareButton>
        </EachMenu>
        <EachMenu>
          <KakaoShareButton size="20">
            <span className="each-menu_shareBox_shareText">공유하기</span>
          </KakaoShareButton>
        </EachMenu>
        <EachMenu>
          <LineShareButton url={imageUrl}>
            <div className="each-menu_shareBox">
              <LineIcon size={20} round={true} />
              <span className="each-menu_shareBox_shareText">공유하기</span>
            </div>
          </LineShareButton>
        </EachMenu>
        <EachMenu>
          <CopyToClipboard onCopy={onCopy} text={imageUrl}>
            <button style={{ padding: 0 }}>
              {' '}
              <CopyUrlButton>URL</CopyUrlButton>
              <span className="each-menu_shareBox_shareText">복사하기</span>
            </button>
          </CopyToClipboard>
        </EachMenu>
      </ShareToggleMenu>
      {copied ? <AlertCopied>링크 복사 완료!</AlertCopied> : null}
    </>
  )
}

const ShareToggleMenu = styled.div`
  position: absolute;
  top: 75px;
  right: 15px;
  width: 80px;
  height: 220px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease-in-out;
  z-index: 400;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const EachMenu = styled.div`
  width: 100%;
  padding: 8px 5px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  .each-menu_shareBox {
    display: flex;
    align-items: center;
  }
  .each-menu_shareBox_shareText {
    font-size: ${({ theme }) => theme.fontSizes.small};
    padding-left: 5px;
  }
`

const AlertCopied = styled.div`
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
`

const CopyUrlButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.yellow};
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 6px;
  font-weight: 700;
  padding: 0;
`

export default ShareMenu
