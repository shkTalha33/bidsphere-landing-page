/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Filter,
  Search,
} from "react-feather";
import ReactPaginate from "react-paginate";
import { HashLoader } from "react-spinners";
import { Input } from "reactstrap";
import NoData from "../NoDataComponent";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// const BootstrapCheckbox = forwardRef((props, ref) => (
//     <div className='form-check'>
//         <Input type='checkbox' ref={ref} {...props} />
//     </div>
// ))

const ProductTable = ({
  data,
  columns,
  currentPage,
  showFilter,
  showRow,
  rowHeading,
  setCurrentPage,
  setLastId,
  count,
  setSearch,
  loading,
  main_title,
  search_query,
  search_query_placeholder,
  handle_search_query,
  statusOptions,
  status,
  setStatus,
}) => {
  const [modal, setModal] = useState(false);
  // const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.language);

  const handleModal = () => setModal(!modal);

  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
    setLastId(page.selected + 1);
  };

  // ** Pagination Previous Component
  const Previous = () => {
    return (
      <Fragment>
        <ArrowLeft size={18} />
      </Fragment>
    );
  };

  // ** Pagination Next Component
  const Next = () => {
    return (
      <Fragment>
        <ArrowRight size={18} />
      </Fragment>
    );
  };
  // ** Custom Pagination
  const CustomPagination = () => (
    <div className="flex justify-center items-center p-2 direction_ltr">
      <ReactPaginate
        previousLabel={<Previous size={15} />}
        nextLabel={<Next size={15} />}
        forcePage={currentPage}
        onPageChange={(page) => handlePagination(page)}
        pageCount={count}
        breakLabel="..."
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName="pagination react-paginate separated-pagination pagination-sm pe-4 justify-end"
      />
      {/* <div className="text-xs sm:text-base poppins_medium mt-4">
        {`Showing ${currentPage * 10 + 1} to ${Math.min(
          (currentPage + 1) * 10,
          count
        )} of ${count} entries`}
      </div> */}
    </div>
  );

  return (
    <>
      <Fragment>
        <div
          className="w-full rounded-xl p-2"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h6
            className={`poppins_semibold mb-1 mb-md-3 text-[#16161D] text-sm sm:text-lg capitalize`}
          >
            {rowHeading}
          </h6>
          {showRow && (
            <div className="flex items-center justify-between flex-wrap p-3 max-md:gap-3 w-full">
              <div className="flex items-center flex-wrap gap-[12px]">
                <div className="relative">
                  <Search className="absolute mt-[12px] ms-3" />
                  <Input
                    className="dataTable-filter ps-5 md:pe-5 py-[8px] w-full"
                    type="text"
                    placeholder="Search anything here"
                    id="search-input-1"
                    value={searchValue}
                    onChange={handleFilter}
                  />
                </div>
                {showFilter && (
                  <div>
                    <button className="flex items-center gap-2 border rounded-lg py-[8px] px-[14px]">
                      <Filter size={20} />
                      <span className="plusJakara_semibold text_black text-sm">
                        Filter
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {loading ? (
            <div
              className="py-5"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <HashLoader size={18} color="#9F1E24" />
            </div>
          ) : (
            <div className="react-dataTable">
              <DataTable
                noHeader
                pagination
                noDataComponent={<NoData description={t("payment.heading3")} />}
                selectableRowsNoSelectAll
                columns={columns}
                paginationPerPage={10}
                className="react-dataTable border-b-0"
                sortIcon={<ChevronDown size={10} />}
                paginationDefaultPage={currentPage + 1}
                paginationComponent={CustomPagination}
                data={searchValue.length ? filteredData : data}
                customStyles={{
                  headRow: {
                    style: {
                      backgroundColor: "#FAFAFA", // Background color for the header row
                      color: "#16161D", // Text color for the header row
                    },
                  },
                  rows: {
                    style: {
                      backgroundColor: "#FAFAFA", // Background color for the table rows
                      color: "#16161D", // Text color for the rows
                    },
                  },
                  pagination: {
                    style: {
                      backgroundColor: "#1a1a2e", // Background color for the pagination
                      color: "#16161D",
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </Fragment>
    </>
  );
};

export default ProductTable;
