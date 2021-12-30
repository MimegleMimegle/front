import React, { useState } from 'react'
import Pagination from 'rc-pagination'
import '../styles/css/Paging.css'

const Paging = ({ page, count, setPage }) => {
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  return <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
}
export default Paging
