import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as likeActions } from '../redux/modules/like'
import { Text } from '../elements'
import { getCookie } from './cookie'

const Like = (props) => {
  const dispatch = useDispatch()
  const [nowLike, setLike] = React.useState(false)

  const token = getCookie('token')

  if (nowLike) {
    return (
      <React.Fragment>
        <FavoriteIcon
          cursor="pointer"
          onClick={() => {
            dispatch(likeActions.changeLikeDictDB(props.dictId, token))
          }}
          color="secondary"
          fontSize="large"
        />
        <Text margin="0px 0px 0px 4px"></Text>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <FavoriteBorderIcon
        cursor="pointer"
        onClick={() => {
          dispatch(likeActions.changeLikeDictDB(props.dictId, token))
        }}
        fontSize="large"
      />
      <Text></Text>
    </React.Fragment>
  )
}

export default Like
