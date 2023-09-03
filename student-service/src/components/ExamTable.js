import {
  Box,
  Button,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { abi, address } from '../constants/constants';
import { useWeb3Contract } from 'react-moralis';
import { v4 as uuidv4 } from 'uuid';

const ExamTable = ({ user, tableData, isTopTable, resetTable }) => {
  const toast = useToast();
  const [grades, setGrades] = useState({});
  const [chosenExam, setChosenExam] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [gradedExam, setGradedExam] = useState({});

  const {
    runContractFunction: registerExam,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: address,
    functionName: 'registerExam',
    msgValue: 5600000000000,
    params: { _professor: chosenExam.professor, _examResult: chosenExam.id },
  });

  const {
    runContractFunction: gradeExam,
    // isLoading,
    // isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: address,
    functionName: 'gradeExam',
    params: { _examResult: gradedExam.id, _grade: gradedExam.grade },
  });
  // Function to handle input changes
  const handleInputChange = (event, id) => {
    setGrades(prevGrades => ({
      ...prevGrades,
      [id]: event,
    }));
  };

  const handleSuccessRegister = async tx => {
    try {
      await tx.wait(1);
      console.log('TRANSACTION COMPLETE');
      console.log(tx);
      axios
        .post(
          `http://localhost:9000/students/register/${user.id}/${chosenExam.exam}/${chosenExam.id}`
        )
        .then(() => {
          resetTable();
          toast({
            title: 'Exam registered',
            description: `Exam with id ${chosenExam.id} successfully registered!`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
          setIsDisabled(false);
        });
    } catch (error) {
      console.log(error);
      setIsDisabled(false);
    }
  };

  const handleSuccessGrade = async tx => {
    try {
      await tx.wait(1);
      axios
        .put(
          `http://localhost:9000/professors/grade/${user.id}/${gradedExam.id}/${gradedExam.grade}`
        )
        .then(() => {
          resetTable();
          toast({
            title: 'Exam Graded',
            description: `Exam application with id ${gradedExam.id} successfully graded with grade ${gradedExam.grade}!`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
          setIsDisabled(false);
        });
    } catch (error) {
      console.log(error);
      setIsDisabled(false);
    }
  };

  const handleRegisterExam = async () => {
    setIsDisabled(true);
    await registerExam({
      onSuccess: handleSuccessRegister,
      onError: () => {
        setIsDisabled(false);
      },
    });
  };

  const handleGradeExam = async () => {
    setIsDisabled(true);
    await gradeExam({
      onSuccess: handleSuccessGrade,
      onError: () => {
        setIsDisabled(false);
      },
    });
  };

  useEffect(() => {
    handleRegisterExam();
  }, [chosenExam]);

  useEffect(() => {
    console.log('HEHEHEHE');
    handleGradeExam();
  }, [gradedExam]);

  //   useEffect(() => {
  //     console.log(grades);
  //   }, [grades]);

  return (
    <Box p="4" my="2%" mx="auto" bg="white" w="95%" h="35%" boxShadow="lg">
      <Heading fontSize="xl" textAlign="left" mb="1%">
        {user.role === 'PROFESSOR'
          ? isTopTable
            ? 'Graded Exams'
            : 'Grade Exams'
          : isTopTable
          ? 'Pending/Graded Exams'
          : 'Pending/Graded Exams'}
      </Heading>
      <TableContainer w="100%" h="80%" overflowY="auto" mx="auto">
        <Table variant="striped" w="100%" h="85%">
          <Thead bg="blue.300">
            <Tr>
              <Th w="18%" color="white" fontSize="md">
                Id
              </Th>
              <Th w="16%" color="white" fontSize="md">
                Name
              </Th>
              <Th w="16%" color="white" fontSize="md">
                {user.role === 'PROFESSOR' ? 'Student' : 'Profesor'}
              </Th>
              <Th w="18%" color="white" fontSize="md">
                {user.role === 'PROFESSOR'
                  ? 'Student Address'
                  : 'Profesor Address'}
              </Th>
              <Th w="16%" color="white" fontSize="md">
                Date
              </Th>
              {isTopTable ? (
                <Th w="16%" color="white" fontSize="md">
                  Grade
                </Th>
              ) : (
                <Th w="auto" color="white" fontSize="md">
                  {user.role === 'PROFESSOR' ? 'Grade' : 'Register'}
                </Th>
              )}
              {user.role === 'PROFESSOR' && !isTopTable && (
                <Th w="auto" color="white" fontSize="md">
                  Submit
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map(data => {
              return (
                <Tr key={data.id}>
                  <Td fontSize="xs" fontWeight="semibold">
                    {data.id}
                  </Td>
                  <Td fontSize="xs" fontWeight="semibold">
                    {data.name}
                  </Td>
                  <Td fontSize="xs" fontWeight="semibold">
                    {user.role === 'PROFESSOR'
                      ? data.studentName
                      : data.professorName}
                  </Td>
                  <Td fontSize="xs" fontWeight="semibold">
                    {user.role === 'PROFESSOR'
                      ? data.studentId
                      : data.professorId}
                  </Td>
                  <Td fontSize="xs" fontWeight="semibold">
                    {new Date(data.examDate).toLocaleDateString() +
                      ' ' +
                      new Date(data.examDate).toLocaleTimeString()}
                  </Td>
                  <Td fontSize="xs" fontWeight="semibold">
                    {isTopTable ? (
                      data.grade
                    ) : user.role === 'PROFESSOR' ? (
                      <NumberInput
                        step={1}
                        min={5}
                        max={10}
                        size="xl"
                        onChange={e =>
                          handleInputChange(e, data.id, data.professorId)
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    ) : (
                      <Button
                        colorScheme="twitter"
                        variant="outline"
                        onClick={() =>
                          setChosenExam({
                            id: uuidv4().toString(),
                            professor: data.professorId,
                            exam: data.id,
                          })
                        }
                        isLoading={isDisabled || isFetching || isLoading}
                        disabled={isDisabled || isFetching || isLoading}
                      >
                        Register
                      </Button>
                    )}
                  </Td>
                  {user.role === 'PROFESSOR' && !isTopTable && (
                    <Td fontSize="xs" fontWeight="semibold">
                      <Button
                        colorScheme="twitter"
                        variant="outline"
                        isDisabled={
                          grades[data.id] == null ||
                          grades[data.id] < 5 ||
                          grades[data.id] > 10 ||
                          isDisabled
                        }
                        isLoading={isDisabled}
                        onClick={() =>
                          setGradedExam({
                            id: data.id,
                            grade: grades[data.id],
                          })
                        }
                      >
                        Grade
                      </Button>
                    </Td>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExamTable;
