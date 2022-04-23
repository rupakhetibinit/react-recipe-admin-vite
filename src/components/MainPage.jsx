import { Flex, Spinner } from '@chakra-ui/react';
import React, { Suspense, useState } from 'react';
const AddRecipe = React.lazy(() => import('./AddRecipe'));
import ShowOrders from './ShowOrders';
const ShowUsers = React.lazy(() => import('./ShowUsers'));
import SideBar from './SideBar';

const MainPage = () => {
	const [selectedTab, setSelectedTab] = useState('Orders');

	return (
		<Flex flexDirection='row'>
			<SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			<Flex alignItems='center' justifyContent='center' marginLeft={20}>
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
