import { Flex, Icon, Link, Menu, MenuButton, Text } from '@chakra-ui/react';
import React from 'react';

const NavItem = ({ navSize, title, icon, active, setSelectedTab }) => {
	return (
		<Flex
			marginTop={30}
			flexDirection='column'
			width='100%'
			alignItems={navSize === 'small' ? 'center' : 'flex-start'}>
			<Menu placement='right'>
				<Link
					backgroundColor={active && '#AEC8CA'}
					padding={3}
					borderRadius={8}
					_hover={{ textDecoration: 'none', backgroundColor: '#AEC8CA' }}
					w={navSize === 'large' && '100%'}
					onClick={() => setSelectedTab(title)}>
					<MenuButton>
						<Flex alignItems='center'>
							<Icon
								as={icon}
								fontSize='xl'
								color={active ? '#82aaad' : 'gray.500'}
							/>
							<Text ml={5} display={navSize === 'small' ? 'none' : 'flex'}>
								{title}
							</Text>
						</Flex>
					</MenuButton>
				</Link>
			</Menu>
		</Flex>
	);
};

export default NavItem;
