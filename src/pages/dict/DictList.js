import React from 'react'
import '../../styles/css/DictList.css'
import { useDispatch, useSelector } from 'react-redux'
import OneDictionaryCard from '../../components/OneDictionaryCard'
import { actionCreators as dictActions } from '../../redux/modules/dict'

const DictList = (props) => {
  const dispatch = useDispatch()

  const dict_list = useSelector((state) => state.dict.list)

  React.useEffect(() => {
    if (dict_list.length === 0) {
      dispatch(dictActions.getDictMainDB())
    }
  }, [])

  return (
    <>
      <div className="DictLayout">
        <div className="DictList">
          {dict_list.map((d) => {
            return <OneDictionaryCard key={d.id} {...d} />
          })}
        </div>
      </div>
    </>
  )
}

export default DictList
