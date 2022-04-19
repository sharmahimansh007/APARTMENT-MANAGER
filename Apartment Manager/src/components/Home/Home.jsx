import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

 
  return (
    
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      {/* {showResident.map((elem) => {
  return <div>
  <h4> {elem.name} </h4>
  <h4> {elem.age} </h4>
  <h4> {elem.gender} </h4>
  <h4> {elem.type} </h4>
  </div>
})} */}
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(OwnerName, FlatNo, Block, TotalResident) {
    
  return { OwnerName, FlatNo, Block, TotalResident };
}

const rows = [

  

  createData('Cupcake', 305, 3.7, 10),
  // createData('Donut', 452, 25.0, 10),
  // createData('Eclair', 262, 16.0, 10),
  // createData('Frozen yoghurt', 159, 6.0, 10),
  // createData('Gingerbread', 356, 16.0, 10),
  // createData('Honeycomb', 408, 3.2, 10),
  // createData('Ice cream sandwich', 237, 9.0, 10),
  // createData('Jelly Bean', 375, 0.0, 105),
  // createData('KitKat', 518, 26.0, 10),
  // createData('Lollipop', 392, 0.2, 10),
  // createData('Marshmallow', 318, 0, 10),
  // createData('Nougat', 360, 19.0, 10),
  // // createData('Oreo', 437, 18.0, 125),
].sort((a, b) => (a.FlatNo < b.FlatNo ? -1 : 1));

export function Home() {

  const [showResident, setShowResident] = React.useState([]);



  React.useEffect(() => {
    axios.get("http://localhost:5000/resident").then(res => {
      console.log(res.data)
     setShowResident([...res.data])
     
    })
  },[])

  const handleSort = (value) => {
    axios.get(`http://localhost:5000/resident?sort=${value}`).then(res => {
      console.log(res.data)
      setShowResident([...res.data])

      console.log("working")
    })
  }



  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/residentdetails/${id}`)
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (

    <>
     
    <button  onClick={() => handleSort("asc")} > Sort in &#x21D1;</button>
    <button onClick={() => handleSort("dsc")}>Sort in &#x21D3;</button>
    <TableContainer component={Paper}>
        <div className='headings'>
            <h2>Owner Name</h2>
            <h2>Flat Number</h2>
            <h2>Block</h2>
            <h2>Total Residents</h2>
        </div>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(showResident > 0
            ? showResident.slice(page * showResident, page * showResident + showResident)
            : showResident
          ).map((row) => (
            <TableRow onClick={() => {handleClick(row._id)}} key={row._id}>
              <TableCell sx={{ cursor: "pointer" }} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 400 }} sx={{ cursor: "pointer" }} align="right">
                {row.id.flat_number}
              </TableCell>
              <TableCell style={{ width: 400 }} sx={{ cursor: "pointer" }} align="right">
                {row.id.block}
              </TableCell>
              <TableCell style={{ width: 450 }} sx={{ cursor: "pointer" }} align="right">
                {row.id.total_residents}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  );
}
/*import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
 */