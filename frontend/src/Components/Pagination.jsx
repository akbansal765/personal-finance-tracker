const Pagination = ({totalTransactions, transactionsPerpage, setCurPage, curPage}) => {
  let pages = [];

  for(let i = 1; i <= Math.ceil(totalTransactions / transactionsPerpage) ; i++){
    pages.push(i);
  }


  return (
    <div>
      <button disabled={curPage === 1} onClick={()=> setCurPage(curPage - 1)} className='prev_btn'>Prev Page</button>
      {
        pages.map((page, i) => {
            return <button key={i} onClick={()=> setCurPage(page)} className={`pageBtn ${curPage === page ? 'active' : ''}`}>{page}</button>
        })
      }
      <button className='next_btn' disabled={curPage === Math.ceil(totalTransactions / transactionsPerpage)} onClick={()=> setCurPage(curPage + 1)}>Next Page</button>
    </div>
  )
}

export default Pagination
