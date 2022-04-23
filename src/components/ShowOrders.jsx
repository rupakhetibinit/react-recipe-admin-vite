import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useQuery, useQueryClient } from 'react-query';
const ShowOrders = () => {
  const queryClient = useQueryClient();
  function generateDateTime(date) {
    return new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
  }
  const { user } = useContext(AuthContext);
  const fetchOrders = () => {
    return axios.get('https://recipetohome-api.herokuapp.com/api/v1/orders', {
      headers: {
        Authorization: `Bearer ${user.token}`,
        contentType: 'application/json',
      },
    });
  };
  const { data, isLoading, isError } = useQuery('orders', fetchOrders, {
    select: data => data.data.orders,
  });
  const handleCancel = async id => {
    axios({
      method: 'delete',
      url: 'https://recipetohome-api.herokuapp.com/api/v1/order/' + id,
      headers: {
        Authorization: 'Bearer ' + user.token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        queryClient.invalidateQueries('orders');
      })
      .catch(err => console.log(err));
  };

  const handleDeliver = async id => {
    axios({
      method: 'patch',
      url: 'https://recipetohome-api.herokuapp.com/api/v1/order/' + id,
      headers: {
        Authorization: 'Bearer ' + user.token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          // message = "Order Delivered";
          console.log('Order Delivered');
        } else {
          // message = "Error Delivering Order";
          console.log('Error Delivering Order');
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        queryClient.invalidateQueries('orders');
      });
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <Text color="red">Error</Text>;
  }
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Showing {data.length} Orders</TableCaption>
        <Thead>
          <Tr>
            <Th>S.N.</Th>
            <Th>Order Id ID</Th>
            <Th>Order Delivered</Th>
            <Th>Order Date</Th>
            <Th isNumeric>Order Total</Th>
            <Th>Order By</Th>
            <Th>Deliver Now</Th>
            <Th>Cancel Order</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((order, index) => {
            return (
              <Tr key={order.id}>
                <Td>{index + 1}</Td>
                <Td>{order.id.split('-')[0].toUpperCase()}</Td>
                <Td>{order.delivered ? 'true' : 'false'}</Td>
                <Td>{generateDateTime(order.createdAt)}</Td>
                <Td>{order.total}</Td>
                <Td>{order.user.name}</Td>
                <Td>
                  <Button
                    onClick={() => handleDeliver(order.id)}
                    disabled={order.delivered}
                  >
                    {order.delivered ? 'Delivered' : 'Deliver Now'}
                  </Button>
                </Td>
                <Td>
                  <Button
                    disabled={order.delivered}
                    onClick={() => handleCancel(order.id)}
                  >
                    {order.delivered ? 'Delivered' : 'Cancel Order'}
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ShowOrders;
