import React, { Suspense, useContext, useEffect } from 'react';
import { ChakraProvider, Spinner, theme } from '@chakra-ui/react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import ReactLazyPreload from './ReactLazyPreload';
const MainPage = ReactLazyPreload(() => import('./components/MainPage'));
function App() {
	const { user, setUser } = useContext(AuthContext);
	useEffect(() => {
		const localUser = JSON.parse(localStorage.getItem('user'));
		!!localUser && setUser({ ...localUser });
	}, [setUser]);
	return (
		<ChakraProvider theme={theme}>
			<Suspense fallback={<Spinner />}>
				{!user.name ? <Login /> : <MainPage />}
			</Suspense>
		</ChakraProvider>
	);
}

export default App;
