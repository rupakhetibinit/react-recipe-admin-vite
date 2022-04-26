import { Flex } from '@chakra-ui/react';
import React, { Suspense, useState } from 'react';
import ReactLazyPreload from '../ReactLazyPreload';
const AddRecipe = ReactLazyPreload(() => import('./AddRecipe'));
import ShowOrders from './ShowOrders';
const ShowUsers = ReactLazyPreload(() => import('./ShowUsers'));
import SideBar from './SideBar';

const MainPage = () => {
	const [selectedTab, setSelectedTab] = useState('Orders');

	return (
		<Flex flexDirection='row'>
			{/* <div style={{ display: 'flex', flexDirection: 'row' }}> */}
			<SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			<Flex alignItems='center' justifyContent='center' marginLeft={20}>
				{/* <div
				className={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginLeft: '40px',
				}}> */}
				<Suspense fallback={<p>Loading...</p>}>
					{selectedTab === 'Orders' && <ShowOrders />}
					{selectedTab === 'Add Recipe' && <AddRecipe />}
					{selectedTab === 'Users' && <ShowUsers />}
				</Suspense>
				{/* </div> */}
			</Flex>
		</Flex>
	);
};

export default MainPage;
