import {
	Button,
	Center,
	FormControl,
	Heading,
	Icon,
	Image,
	Input,
	InputGroup,
	InputLeftAddon,
	Stack,
	Text,
} from '@chakra-ui/react';
import { FiAtSign, FiLock } from 'react-icons/fi';
import React, { useContext } from 'react';
import axios from 'axios';
import { object, string } from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
const schema = object().shape({
	email: string()
		.email('Invalid Email')
		.required('Please enter your email address'),
	password: string().required('Please enter your password').min(6),
});

const Login = () => {
	const { user, setUser } = useContext(AuthContext);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = (values) => {
		axios
			.post('https://recipetohome-api.herokuapp.com/api/auth/login', {
				email: values.email,
				password: values.password,
			})
			.then((res) => {
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
			.catch((err) => console.error(err));
	};
	return (
		<Center h='100vh' bg='purple.200'>
			<Stack boxShadow='md' bg='whiteAlpha.900' p='20' rounded='md'>
				<Image src='images' maxW='70px' mx='auto' mb='8' alt='Burger Logo' />
				<Heading as='h3'>Admin Panel Login</Heading>
				<Text fontSize='md' color='gray.600'>
					Please login using email and password
				</Text>

				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl control={control}>
						<Stack pb={5}>
							<InputGroup>
								<InputLeftAddon
									bg='purple.50'
									children={<Icon as={FiAtSign} />}
								/>
								<Input
									focusBorderColor='purple.500'
									id='email'
									type='email'
									placeholder='Email'
									autoComplete='email'
									{...register('email', { required: 'This is required' })}
								/>
							</InputGroup>
							<p>{errors?.email?.message}</p>
						</Stack>
						<Stack pb={5}>
							<InputGroup>
								<InputLeftAddon
									bg='purple.50'
									children={<Icon as={FiLock} />}
								/>
								<Input
									focusBorderColor='purple.500'
									id='password'
									placeholder='Password'
									type='password'
									autoComplete='password'
									minLength={6}
									{...register('password', { required: 'This is required' })}
								/>
							</InputGroup>
							<p>{errors?.password?.message}</p>
						</Stack>

						<Button
							isLoading={isSubmitting}
							loadingText='Waiting for response'
							size='lg'
							colorScheme='purple'
							type='submit'>
							Log In
						</Button>
					</FormControl>
				</form>
			</Stack>
		</Center>
	);
};

export default Login;
