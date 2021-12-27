import React from 'react'
import '../styles/css/OneDictionaryCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { history } from '../redux/ConfigureStore'
import { actionCreators as dictActions } from '../redux/modules/dict'

const OneDictionaryCard = (props) => {
  const dispatch = useDispatch()
  const dict_list = useSelector((state) => state.dict.list)

  console.log(props)
  const [dict, setDict] = React.useState('')

  React.useEffect(() => {
    dispatch(dictActions.getDictMainDB())
  }, [])

  return (
    <>
      <div className="OneDictionaryCard">
        <div className="OneDictionaryCard Card1">{props.title}</div>
        <div className="OneDictionaryCard Card2"></div>
      </div>
    </>
  )
}

export default OneDictionaryCard
