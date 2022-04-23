import { Flex, Spinner } from '@chakra-ui/react';
import React, { Suspense, useState } from 'react';
const AddRecipe = React.lazy(() => import('./AddRecipe'));
import ShowOrders from './ShowOrders';
const ShowUsers = React.lazy(() => import('./ShowUsers'));
import SideBar from './SideBar';

const MainPage = () => {
	// const { user, setUser } = useContext(AuthContext);
	const [selectedTab, setSelectedTab] = useState('Orders');
	// const tabs = [
	//   { title: 'Dashboard', content: HomePage },
	//   { title: 'Orders', content: ShowOrders },
	//   { title: 'Users', content: ShowUsers },
	//   { title: 'Add Recipe', content: AddRecipe },
	// ];

	return (
		<Flex flexDirection='row'>
			{/* <Button
        onClick={() => {
          setUser({
            isAdmin: false,
            email: '',
            token: '',
            name: '',
          });
          localStorage.removeItem('user');
        }}
      >
        Log Out
      </Button> */}
			<SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			<Flex alignItems='center' justifyContent='center' marginLeft={20}>
				{/* {selectedTab === 'Dashboard' && <HomePage />} */}
				<Suspense fallback={<Spinner />}>
					{selectedTab === 'Orders' && <ShowOrders />}
					{selectedTab === 'Add Recipe' && <AddRecipe />}
					{selectedTab === 'Users' && <ShowUsers />}
				</Suspense>
			</Flex>
		</Flex>
	);
};

export default MainPage;
