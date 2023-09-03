import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useMoralis, useWeb3Contract } from 'react-moralis';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import { abi, address } from '../constants/constants';
import { Box, Center, Heading } from '@chakra-ui/react';
import { ConnectButton } from '@web3uikit/web3';

const LandingPage = () => {
  const { account, logout } = useMoralis();
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const { runContractFunction: getUser } = useWeb3Contract({
    abi: abi,
    contractAddress: address,
    functionName: 'getUser',
    params: { _addr: account },
  });

  useEffect(() => {
    if (!(account == null)) {
      getUser().then(res => {
        if (!res) setIsAuthenticated(false);
        else {
          axios.get(`http://localhost:9000/users/${account}`).then(res => {
            setUser(res.data.value);
            setIsAuthenticated(true);
          });
        }
      });
    } else {
      setUser(null);
    }
  }, [account]);

  if (!isAuthenticated && !(account == null)) {
    return (
      <Center>
        <Heading>
          User with address {account} is not registered on the student service
          smart contract
        </Heading>
        <ConnectButton></ConnectButton>
      </Center>
    );
  }
  if (user == null) {
    return <LoginPage />;
  }

  return <HomePage user={user} />;
};

export default LandingPage;
