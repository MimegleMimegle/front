import React, { useState, useEffect } from 'react'
import '../../styles/css/DictDetail.css'
import { useDispatch, useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'
import { dictApi } from '../../shared/api'
import { likeApi } from '../../shared/api'
import { ReactComponent as EmptyBookMarkIcon } from '../../styles/icons/bookmark_blank.svg'
import { ReactComponent as FillBookMarkIcon } from '../../styles/icons/bookmark_filled.svg'
import swal from 'sweetalert'
import 'moment'
import 'moment/locale/ko'
import moment from 'moment'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Grid from '../../elements/Grid'
import { ReactComponent as CopyIcon } from '../../styles/icons/link.svg'
import AlertModal from '../../components/modal/AlertModal'
import ConfirmModal from '../../components/modal/ConfirmModal'

const DictDetail = (props) => {
  const dispatch = useDispatch()

  const userId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const isLogin = userId !== null && token !== null ? true : false

  const [show, setShow] = useState(false)

  const [dict, setDict] = useState([])
  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const [createdAt, setCreatedAt] = useState('')
  const [modifiedAt, setModifiedAt] = useState('')

  const [showModal, setShowModal] = useState(false)

  const getDictDetailDB = async () => {
    await dictApi
      .getDictDetail(dictId)
      .then((response) => {
        setDict(response.data.data)
        setLike(response.data.data.like)
        setLikeCount(response.data.data.likeCount)
        setCreatedAt(response.data.data.createdAt.split('T')[0])
        setModifiedAt(response.data.data.modifiedAt.split('T')[0])
      })
      .catch((error) => {
        console.log('밈 사전 상세 정보 불러오기 실패', error.response)
      })
  }

  const dictId = Number(props.match.params.dictId)

  const showSearchBar = () => {
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const handleClickLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (like) {
      await likeApi
        .likeDict(dictId)
        .then((response) => {
          setLike(false)
          setLikeCount(likeCount - 1)
          dispatch(getDictDetailDB(like, likeCount))
        })
        .catch((error) => {
          console.log('밈 사전 좋아요 취소 실패', error.response)
        })
    } else {
      await likeApi
        .likeDict(dictId)
        .then((response) => {
          setLike(true)
          setLikeCount(likeCount + 1)
          dispatch(getDictDetailDB(like, likeCount))
        })
        .catch((error) => {
          console.log('밈 사전 좋아요 문제 발생', error.response)
        })
    }
  }

  const currentUrl = window.location.href

  const [copyLink, setCopyLink] = useState(false)

  const handleCopy = () => {
    setCopyLink(true)
    setTimeout(() => setCopyLink(false), 2000)
  }

  const handleClickEdit = () => {
    if (!isLogin) {
      setShowModal(true)
    } else {
      history.push(`/dict/edit/${dictId}`)
    }
  }

  React.useEffect(() => {
    getDictDetailDB()
  }, [])

  return (
    <>
      <Header type="goBack" location="오픈 밈사전" />
      {/* <SearchBarSection>{show && <SearchPage />}</SearchBarSection> */}
      <div className="OneDictCardDetailPageLayout">
        <Grid flex_start column padding="20px">
          <Grid flex_align padding="0 0 36px">
            <div className="OneDictCardDetailInfo_Guide">밈 단어</div>
            <div className="OneDictCardDetailInfo_Vertical" />
            <div className="OneDictCardDetailInfo_DictData">{dict.title}</div>
          </Grid>
          <Grid flex_align padding="0 0 36px">
            <div className="OneDictCardDetailInfo_Guide">한줄설명</div>
            <div className="OneDictCardDetailInfo_Vertical" />
            <div className="OneDictCardDetailInfo_DictData">{dict.summary}</div>
          </Grid>
          <Grid flex padding="0 0 36px">
            <div style={{ display: 'flex', alignItems: 'flex_start', height: 'fit-content' }}>
              <div className="OneDictCardDetailInfo_Guide">상세설명</div>
              <div className="OneDictCardDetailInfo_Vertical" />
            </div>
            <div className="OneDictCardDetailInfo_DictData">{dict.meaning}</div>
          </Grid>
          <Grid flex_between>
            <Grid flex_align>
              {like ? (
                <FillBookMarkIcon className="icon" fill="#878C92" height="20px" width="20px" onClick={handleClickLike} />
              ) : (
                <EmptyBookMarkIcon className="icon" fill="#878C92" height="20px" width="20px" onClick={handleClickLike} />
              )}
              <div className="OneDictCardDetailInfoLikeCnt">{dict.likeCount}</div>
            </Grid>
            <CopyToClipboard onCopy={handleCopy} text={currentUrl}>
              <CopyIcon className="icon" fill="#878C92" />
            </CopyToClipboard>
          </Grid>
        </Grid>

        <div className="OneDictCardDetailInfoWriterAndAt">
          <div className="OneDictCardDetailInfoWriterAndAt First">
            <img className="OneDictCardDetailInfoFirstWriterProfileImage" src={dict.firstWriterProfileImage} />
            <div className="OneDictCardDetailInfoFirstWriterCreatedAt">
              <div className="OneDictCardDetailInfoFirstWriter">{dict.firstWriter}</div>
              <div className="OneDictCardDetailInfoCreatedAt">(최초 작성자) {createdAt}</div>
            </div>
          </div>
          <div className="OneDictCardDetailInfoWriterAndAt Recent">
            <img className="OneDictCardDetailInfoRecentWriterProfileImage" src={dict.recentWriterProfileImage} />
            <div className="OneDictCardDetailInfoRecentWriterModifiedAt">
              <div className="OneDictCardDetailInfoRecentWriter">{dict.recentWriter}</div>
              <div className="OneDictCardDetailInfoModifiedAt">(최근 작성자) {modifiedAt}</div>
            </div>
          </div>
        </div>
        <Grid flex_center column padding="32px 0">
          <p className="OneDictCardDetailInfoText">다른 유저들이 이전에 작성한 내용을 확인하거나</p>
          <p className="OneDictCardDetailInfoText">직접 편집할 수 있어요!</p>
        </Grid>
        <div className="OneDictCardDetailInfoModifiedAndHistoryButton">
          <div className="OneDictCardDetailInfoModifiedHistoryButton" onClick={() => history.push(`/dict/history/${dictId}`)}>
            <div className="OneDictCardDetailInfoModifiedHistoryButton_1">편집 기록</div>
            <div className="OneDictCardDetailInfoModifiedHistoryButton_2"></div>
          </div>
          <div className="OneDictCardDetailInfoModifiedButton" onClick={handleClickEdit}>
            <div className="OneDictCardDetailInfoModifiedButton_1">편집하기</div>
            <div className="OneDictCardDetailInfoModifiedButton_2"></div>
          </div>
        </div>
      </div>
      <Footer />
      <AlertModal showModal={copyLink}>링크 복사 완료!</AlertModal>
      <ConfirmModal showModal={showModal} setShowModal={setShowModal} title="로그인 후 이용 가능합니다!" question="로그인 페이지로 이동하시겠어요?">
        <MoveLoginButton onClick={() => history.push('/login')}>이동</MoveLoginButton>
      </ConfirmModal>
    </>
  )
}

const SearchBarSection = styled.div`
  position: absolute;
  top: 74px;
  width: 100%;
  height: fit-content;
  z-index: 5;
`

const MoveLoginButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default DictDetail
