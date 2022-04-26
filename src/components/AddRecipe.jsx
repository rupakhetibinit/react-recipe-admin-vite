import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Image,
	Input,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AddRecipe = () => {
	const { user } = useContext(AuthContext);
	const [file, setFile] = useState(null);
	const [showing, setShowing] = useState(false);
	const [imageUrl, setImageUrl] = useState('');

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: '',
			servings: 0,
			steps: [' '],
			ingredients: [{ name: '', price: 0 }],
			description: '',
		},
	});
	const { fields, remove, append } = useFieldArray({
		name: 'steps',
		control,
	});
	const {
		fields: ingredients,
		append: ingredientAppend,
		remove: ingredientRemove,
	} = useFieldArray({ name: 'ingredients', control });

	const onSubmit = (values) => {
		console.log(values, imageUrl);
		axios
			.post(
				'https://recipetohome-api.herokuapp.com/api/v1/recipes',
				{ ...values, imageUrl },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
						'Content-Type': 'application/json',
					},
				}
			)
			.then((res) => {
				console.log(res);
				if (res.statusText === 'OK') {
					console.log('success');
					reset();
				} else {
					console.log('failed');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setFile(undefined);
			return;
		}
		setFile(e.target.files[0]);
	};

	const handleUpload = () => {
		if (file) {
			const formData = new FormData();
			formData.append('recipe-file', file);

			axios
				.post(
					'https://recipetohome-api.herokuapp.com/image-upload-single',
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				)
				.then((res) => {
					console.log(res);

					setImageUrl(res?.data?.path);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<Flex>
			<Heading>Add Recipe</Heading>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl control={control}>
					<FormLabel htmlFor='name'>Recipe Name</FormLabel>
					<Input
						id='name'
						placeholder='Recipe Name'
						{...register('name', { required: 'This is required' })}
					/>
					<FormLabel htmlFor='description'>Description</FormLabel>
					<Input
						id='description'
						placeholder='Description'
						{...register('description', { required: 'This is required' })}
					/>
					<FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
					<FormLabel htmlFor='servings'>Servings</FormLabel>
					<Input
						id='servings'
						placeholder='Servings'
						type='number'
						{...register('servings', {
							required: 'This is required',
							setValueAs: (v) => parseInt(v),
						})}
					/>
					<FormLabel htmlFor='steps'>Recipe steps</FormLabel>
					{fields.map((item, index) => (
						<div key={item.id}>
							<Input
								placeholder={`step ${index + 1}`}
								{...register(`steps[${index}]`)}
							/>
							<Button onClick={() => remove(index)}>-</Button>
						</div>
					))}
					<Button onClick={() => append('')}>+</Button>
					<FormLabel htmlFor='ingredients'>Ingredients</FormLabel>
					{ingredients.map((item, index) => (
						<div key={item.id}>
							<Input
								placeholder={`ingredient ${index + 1} name`}
								{...register(`ingredients[${index}].name`)}
							/>
							<Input
								type='number'
								placeholder={`ingredient ${index + 1} price`}
								{...register(`ingredients[${index}].price`, {
									setValueAs: (v) => parseInt(v),
								})}
							/>
							<Button onClick={() => ingredientRemove(index)}>-</Button>
						</div>
					))}
					<Button onClick={() => ingredientAppend({ name: '', price: '' })}>
						+
					</Button>

					<Input
						type='file'
						accept='jpg, .jpeg, .png'
						onChange={handleChange}
					/>

					{imageUrl && (
						<Image width={300} heigh={300} src={imageUrl} alt='Preview' />
					)}

					<Button onClick={handleUpload} disabled={showing}>
						{imageUrl ? 'Uploaded' : 'Upload'}
					</Button>

					<Button
						mt={4}
						colorScheme='teal'
						isLoading={isSubmitting}
						type='submit'>
						Submit
					</Button>
				</FormControl>
			</form>
		</Flex>
	);
};

export default AddRecipe;
