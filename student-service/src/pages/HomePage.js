import { Box, Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ExamTable from '../components/ExamTable';
import { useWeb3Contract } from 'react-moralis';
import { abi, address } from '../constants/constants';

const HomePage = ({ user }) => {
  const [firstTable, setFirstTable] = useState([]);
  const [secondTable, setSecondTable] = useState([]);

  const { runContractFunction: getExamResults } = useWeb3Contract({
    abi: abi,
    contractAddress: address,
    functionName: 'getExamResults',
    params: { _user: user.id, _isProfessor: user.role === 'PROFESSOR' },
  });

  const resetTable = () => {
    getExamResults().then(res => {
      console.log(res);
    });
    if (user.role === 'STUDENT') {
      axios
        .get(`http://localhost:9000/students/exam-results/${user.id}`)
        .then(res => {
          setFirstTable(res.data);
          axios
            .get(`http://localhost:9000/students/unregistered/${user.id}`)
            .then(res => {
              setSecondTable(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (user.role === 'PROFESSOR') {
      axios
        .get(`http://localhost:9000/professors/graded/${user.id}`)
        .then(res => {
          setFirstTable(res.data);
          axios
            .get(`http://localhost:9000/professors/pending/${user.id}`)
            .then(res => {
              setSecondTable(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (!(user == null)) {
      resetTable();
    } else {
      setFirstTable([]);
      setSecondTable([]);
    }
  }, [user]);

  return (
    <Flex>
      <Box>
        <Sidebar user={user} />
      </Box>
      <Box flex="1">
        <Navbar />

        <ExamTable user={user} tableData={firstTable} isTopTable={true} />
        <ExamTable
          user={user}
          tableData={secondTable}
          isTopTable={false}
          resetTable={resetTable}
        />
      </Box>
    </Flex>
  );
};

export default HomePage;
