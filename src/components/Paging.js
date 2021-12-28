import React, { useState } from 'react'
import Pagination from 'react-js-pagination'
import '../styles/css/Paging.css'

const Paging = ({ page, count, setPage }) => {
  return <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={count} pageRangeDisplayed={10} prevPageText={'‹'} nextPageText={'›'} onChange={setPage} />
}
export default Paging
