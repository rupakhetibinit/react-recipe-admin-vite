import {
	Avatar,
	Button,
	Divider,
	Flex,
	Heading,
	IconButton,
	Text,
} from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { FiMenu, FiShoppingCart, FiUsers, FiPlus } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import NavItem from './NavItem';
const SideBar = ({ selectedTab, setSelectedTab }) => {
	const tabs = [
		{ title: 'Orders', icon: FiShoppingCart },
		{ title: 'Users', icon: FiUsers },
		{ title: 'Add Recipe', icon: FiPlus },
	];
	const [navSize, setNavSize] = useState('large');
	const { user, setUser } = useContext(AuthContext);
	return (
		<Flex
			position='sticky'
			left='5'
			h='95vh'
			marginTop='2.5vh'
			boxShadow='0 4px 12px 0 rgba(0,0,0,0.05)'
			borderRadius={navSize === 'small' ? '15px' : '30px'}
			w={navSize === 'small' ? '75px' : '200px'}
			flexDirection='column'
			justifyContent='space-between'
			background='gray.100'>
			<Flex
				padding='5%'
				v
				flexDirection='column'
				alignItems={navSize === 'small' ? 'center' : 'flex-start'}
				as='nav'>
				<IconButton
					background='none'
					_focus={{ boxShadow: 'none' }}
					mt={5}
					_hover={{ background: 'gray.200' }}
					icon={<FiMenu />}
					onClick={() => {
						console.log('clicked');
						if (navSize === 'small') {
							setNavSize('large');
						} else {
							setNavSize('small');
						}
					}}
				/>
				{tabs.map((tab) => (
					<NavItem
						navSize={navSize}
						icon={tab.icon}
						title={tab.title}
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
						active={selectedTab === tab.title ? true : false}
						key={tab.title}
					/>
				))}
			</Flex>
			<Flex
				p='5%'
				flexDirection='column'
				w='100%'
				mb={4}
				alignItems={navSize === 'small' ? 'center' : 'flex-start'}>
				<div>
					<Button
						onClick={() => {
							setUser({
								isAdmin: false,
								email: '',
								token: '',
								name: '',
							});
							localStorage.removeItem('user');
						}}>
						Log Out
					</Button>
				</div>
				<Divider display={navSize === 'small' ? 'none' : 'flex'} />
				<Flex mt={4} alignItems='center'>
					<Avatar size='sm' />
					<Flex
						flexDirection='column'
						marginLeft='4'
						display={navSize === 'small' ? 'none' : 'flex'}>
						<Heading as='h3' width={40} size='sm'>
							{user.name}
						</Heading>
						<Text color='gray'>Admin</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default SideBar;
