import React, { useState, useEffect } from "react";

import "./style.css";

function Pagination() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  let fetchData = async () => {
    try {
      let rawData = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      let data = await rawData.json();

      setData(data);
    } catch (error) {
      alert("failed to fetch data");
    }
  };

  useEffect(()=>{
   fetchData()
  }, [])
 

  let itemPerPage = 10;
  let start = (page - 1) * itemPerPage;
  let totalPages = Math.ceil(data.length / itemPerPage);

  let pageData = data.slice(start, start + itemPerPage);

  const handlePrev = () => {
    if(page>1) setPage(page-1)
  };

  const handleNext = () => {
   if(page<totalPages) setPage(page+1)
  };

  // useEffect(() => {

  // }, []);

  return (
    <>
      
        <header className="header">
          <h2>Employee Data Table</h2>
        </header>
        <div className="container">
          <table>
            
            <thead>
             
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
             
            </thead>
             
            <tbody>
              {pageData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-wrapper">
          <button disabled={page === 1} onClick={handlePrev}>
            prev
          </button>
          <div className="page">{page}</div>
          <button disabled={page === totalPages} onClick={handleNext}>
            next
          </button>
        </div>
    
    </>
  );
}

export default Pagination;
