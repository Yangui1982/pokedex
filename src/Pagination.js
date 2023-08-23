// import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';

// const LEFT_PAGE = 'LEFT';
// const RIGHT_PAGE = 'RIGHT';
// const range = (from, to, step = 1) => {
//   let i = from;
//   const range = [];

//   while (i <= to) {
//     range.push(i);
//     i += step;
//   }

//   return range;
// }

// class Pagination extends Component {
//   constructor(props) {
//     super(props);
//     const { totalRecords = null, pageLimit = 160, pageNeighbours = 1 } = props;

//     this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 160;
//     this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

//     this.pageNeighbours = typeof pageNeighbours === 'number'
//       ? Math.max(0, Math.min(pageNeighbours, 2))
//       : 0;

//     this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

//     this.state = { currentPage: 1 };
//   }
//   fetchPageNumbers = () => {
//     const totalPages = this.totalPages;
//     const currentPage = this.state.currentPage;
//     const pageNeighbours = this.pageNeighbours;
//     const totalNumbers = (this.pageNeighbours * 2) + 3;
//     const totalBlocks = totalNumbers + 2;

//     if (totalPages > totalBlocks) {
//       const startPage = Math.max(2, currentPage - pageNeighbours);
//       const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
//       let pages = range(startPage, endPage);
//       const hasLeftSpill = startPage > 2;
//       const hasRightSpill = (totalPages - endPage) > 1;
//       const spillOffset = totalNumbers - (pages.length + 1);

//       switch (true) {
//         case (hasLeftSpill && !hasRightSpill): {
//           const extraPages = range(startPage - spillOffset, startPage - 1);
//           pages = [LEFT_PAGE, ...extraPages, ...pages];
//           break;
//         }

//         case (!hasLeftSpill && hasRightSpill): {
//           const extraPages = range(endPage + 1, endPage + spillOffset);
//           pages = [...pages, ...extraPages, RIGHT_PAGE];
//           break;
//         }

//         case (hasLeftSpill && hasRightSpill):
//         default: {
//           pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
//           break;
//         }
//       }

//       return [1, ...pages, totalPages];
//     }

//     return range(1, totalPages);
//   }
//   render() {
//     if (!this.totalRecords || this.totalPages === 1) return null;

//     const { currentPage } = this.state;
//     const pages = this.fetchPageNumbers();

//     return (
//       <Fragment>
//         <footer aria-label="Pokemons Pagination">
//           <ul className="pagination">
//             { pages.map((page, index) => {

//               if (page === LEFT_PAGE) return (
//                 <li key={index} className="page-item">
//                   <button className="page-link" aria-label="Previous" onClick={this.handleMoveLeft}>
//                     <span aria-hidden="true">&laquo;</span>
//                     <span className="sr-only">Previous</span>
//                   </button>
//                 </li>
//               );

//               if (page === RIGHT_PAGE) return (
//                 <li key={index} className="page-item">
//                   <button className="page-link" aria-label="Next" onClick={this.handleMoveRight}>
//                     <span aria-hidden="true">&raquo;</span>
//                     <span className="sr-only">Next</span>
//                   </button>
//                 </li>
//               );

//               return (
//                 <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
//                   <button className="page-link" onClick={ this.handleClick(page) }>{ page }</button>
//                 </li>
//               );

//             }) }

//           </ul>
//         </footer>
//       </Fragment>
//     );
//   }
//   componentDidMount() {
//     this.gotoPage(1);
//   }

//   gotoPage = page => {
//     const { onPageChanged = f => f } = this.props;
//     const currentPage = Math.max(0, Math.min(page, this.totalPages));
//     const paginationData = {
//       currentPage,
//       totalPages: this.totalPages,
//       pageLimit: this.pageLimit,
//       totalRecords: this.totalRecords
//     };

//     this.setState({ currentPage }, () => onPageChanged(paginationData));
//   }

//   handleClick = page => evt => {
//     evt.preventDefault();
//     this.gotoPage(page);
//   }

//   handleMoveLeft = evt => {
//     evt.preventDefault();
//     this.gotoPage(this.state.currentPage - (this.pageNeighbours * 2) - 1);
//   }

//   handleMoveRight = evt => {
//     evt.preventDefault();
//     this.gotoPage(this.state.currentPage + (this.pageNeighbours * 2) + 1);
//   }
// }

// Pagination.propTypes = {
//   totalRecords: PropTypes.number.isRequired,
//   pageLimit: PropTypes.number,
//   pageNeighbours: PropTypes.number,
//   onPageChanged: PropTypes.func
// };

// export default Pagination;

import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const visiblePageNumbers = pageNumbers.filter(
    (pageNumber) =>
      pageNumber === currentPage ||
      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
  );

  return (
    <div className="pages">
      {currentPage >= 1 && (
        <>
          <button onClick={() => handlePageChange(1)}>&laquo;</button>
          <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
        </>
      )}
      {visiblePageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={currentPage === pageNumber ? "active" : ""}
        >
          {pageNumber}
        </button>
      ))}
      {currentPage <= totalPages && (
        <>
          <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
          <button onClick={() => handlePageChange(totalPages)}>&raquo;</button>
        </>
      )}
    </div>
  );
};

export default Pagination;
