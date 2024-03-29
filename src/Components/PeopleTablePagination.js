const LIMIT = 10;

function PeopleTablePagination({ page, total, onChange }) {
  const totalPages = Math.ceil(total / LIMIT);
  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageIndex) => {
          const action = () => {
            if (pageIndex !== page) {
              onChange(pageIndex);
            }
          };
          const isActive = pageIndex === page;
          return isActive ? (
            <b key={pageIndex} onClick={action}>
              {" "}
              {pageIndex}{" "}
            </b>
          ) : (
            <span key={pageIndex} onClick={action}>
              {" "}
              {pageIndex}{" "}
            </span>
          );
        }
      )}
    </div>
  );
}

export default PeopleTablePagination;
