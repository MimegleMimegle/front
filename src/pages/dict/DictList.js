import React from 'react'
import '../../styles/css/DictList.css'
import OneDictionaryCard from '../../components/OneDictionaryCard'

const DictList = (props) => {
  return (
    <>
      <div className="DictLayout">
        <div className="DictList">
          <OneDictionaryCard />
        </div>
      </div>
    </>
  )
}

export default DictList
