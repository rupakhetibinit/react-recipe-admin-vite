import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQueryClient } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import { useQuery } from 'react-query';

const ShowUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [value, setValue] = useState(0);
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const { user } = useContext(AuthContext);
  const fetchUsers = () => {
    return axios.get('https://recipetohome-api.herokuapp.com/api/v1/users', {
      headers: {
        Authorization: `Bearer ${user.token}`,
        contentType: 'application/json',
      },
    });
  };

  async function handleWalletAdd() {
    try {
      const data = await axios.post(
        'https://recipetohome-api.herokuapp.com/api/v1/users/wallet',
        {
          userId: selectedUser.id,
          wallet: value,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            contentType: 'application/json',
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      queryClient.invalidateQueries('users');
    }
  }

  const { data, isLoading, isError } = useQuery('users', fetchUsers, {
    select: data => data.data.users,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <Text color="red">Error</Text>;
  }
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Showing {data?.length} Users</TableCaption>
          <Thead>
            <Tr>
              <Th>User ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Total Orders</Th>
              <Th isNumeric>Wallet Balance</Th>
              <Th>Add Wallet Money</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map(user => {
              return (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user._count.orders}</Td>
                  <Td>{user.wallet}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        setSelectedUser(user);
                        onOpen();
                      }}
                    >
                      Add Money
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal
        finalFocusRef={finalRef}
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Money to {selectedUser?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="number" onChange={e => setValue(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="danger"
              mr={3}
              onClick={() => {
                // queryClient.invalidateQueries('users');
                onClose();
                setSelectedUser(null);
              }}
            >
              Close
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                // queryClient.invalidateQueries('user');
                onClose();
                handleWalletAdd();
                setSelectedUser(null);
              }}
            >
              Add Balance
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowUsers;
