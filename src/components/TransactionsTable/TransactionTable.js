import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';

 
 const BasicTable = (props) => {
    const {rows,limit} = props;
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Amount (€)</TableCell>
              <TableCell align="right">Total Amount (€)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {limit && rows?.length > 0 ? 
            rows.slice(0,limit).map((row,i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell>
              {row.amount > 0 ? <TrendingUpIcon style={{ color: "green" }} /> : <TrendingDownIcon style={{ color: 'red' }} />}
              </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.transactionType}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.amount > 0 ? "+ " + row.amount : row.amount} €</TableCell>
                <TableCell align="right">{row.totalAmount} €</TableCell>
              </TableRow>
            )) :
            rows.map((row,i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell>
              {row.amount > 0 ? <TrendingUpIcon style={{ color: "green" }} /> : <TrendingDownIcon style={{ color: 'red' }} />}
              </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.transactionType}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.amount > 0 ? "+ " + row.amount : row.amount} €</TableCell>
                <TableCell align="right">{row.totalAmount} €</TableCell>
              </TableRow>
            )) 
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  export default BasicTable;