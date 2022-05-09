import React, {useState} from 'react';

import {  Typography, Paper , Box, Tab, Tabs} from '@material-ui/core';

import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import BasicTable from '../TransactionsTable/TransactionTable';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={"span"}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

const Transaction = () => {

    const [tab, setTab] = useState(0);
    const userState = useSelector(state => state.user)

    const handleChange = (e, tab) => {
        setTab(tab);
    }

  return (
    
        <Paper elevation={6}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="All" />
                    <Tab label="Expenses" />
                    <Tab label="Revenues" />
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <BasicTable rows={userState?.transactions ? userState.transactions : []}/>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <BasicTable rows={userState?.transactions ? userState.transactions.filter((row) => row.amount < 0) : []}/>
            </TabPanel>
            <TabPanel value={tab} index={2}>
                <BasicTable rows={userState?.transactions ? userState.transactions.filter((row) => row.amount > 0) : []}/>
            </TabPanel>
        </Paper>
    
  )
}

export default Transaction