import { useState } from "react"


const Pagination = ({ handleClick }) => {
  const [page, setPage] = useState(0)

  const pageCount = new Array(10).fill(0)

  const handleClick_ = ()=>{
    setPage(page - 1)
    handleClick()
  } 

  return (

    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page == 0 ? "disabled" : "enabled"}`}>
          <a className="page-link" onClick={handleClick_}>Previous</a>
        </li>

        {
          pageCount.map((item, i) => (
            <li className={`page-item ${i == page && "active"}`} key={i}>
              <a className="page-link" onClick={handleClick_} href="#">{i + 1}</a>
            </li>
          ))
        }

        <li className={`page-item ${page == 9 && "disabled"}`}>
          <a className="page-link" href="#" onClick={() => setPage(page + 1)}>Next</a>
        </li>
      </ul>
    </nav>

  )
}

export default Pagination
