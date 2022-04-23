import { Button, Center, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import InputField from './InputField';
import { object, string } from 'yup';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
const schema = object().shape({
	email: string()
		.email('Invalid Email')
		.required('Please enter your email address'),
	password: string().required('Please enter your password').min(6),
});

const Login = () => {
	const { user, setUser } = useContext(AuthContext);

	return (
		<Center h='100vh' bg='purple.200'>
			<Stack boxShadow='md' bg='whiteAlpha.900' p='20' rounded='md'>
				<Image src='images' maxW='70px' mx='auto' mb='8' />
				<Heading as='h3'>Admin Panel Login</Heading>
				<Text fontSize='md' color='gray.600'>
					Please login using email and password
				</Text>

				<Formik
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(true);
						axios
							.post('https://recipetohome-api.herokuapp.com/api/auth/login', {
								email: values.email,
								password: values.password,
							})
							.then((res) => {
								console.log(res.data);

								setUser({
									...user,
									email: res.data.email,
									token: res.data.accessToken,
									name: res.data.name,
									isAdmin: res.data.isAdmin,
								});
								localStorage.setItem(
									'user',
									JSON.stringify({
										email: res.data.email,
										token: res.data.accessToken,
										name: res.data.name,
										isAdmin: res.data.isAdmin,
									})
								);
							})
							.catch((err) => console.error(err))
							.finally(() => setSubmitting(false));
					}}
					initialValues={{ email: '', password: '' }}
					validationSchema={schema}>
					{({ isSubmitting }) => (
						<Form>
							<Stack my='4' spacing='6'>
								Field
								<InputField
									name='email'
									type='email'
									label='Email'
									leftAddon={<AtSignIcon color='purple.500' />}
								/>
								<InputField
									name='password'
									type='password'
									label='Password'
									leftAddon={<LockIcon color='purple.500' />}
								/>
								<Button
									isLoading={isSubmitting}
									loadingText='Waiting for response'
									size='lg'
									colorScheme='purple'
									type='submit'>
									Log In
								</Button>
							</Stack>
						</Form>
					)}
				</Formik>

				<Stack justify='center' color='gray.600' spacing='3'>
					<Text as='div' textAlign='center'>
						<span></span>
					</Text>
				</Stack>
			</Stack>
		</Center>
	);
};

export default Login;
