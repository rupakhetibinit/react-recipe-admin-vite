import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Image,
	Input,
	Text,
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
			servings: null,
			steps: [' '],
			ingredients: [
				{ name: '', price: null, measurement: '', amount: null, required: '' },
			],
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
		if (!imageUrl) return;
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
					setImageUrl('');
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
		<Flex flexDirection='column' alignItems='center'>
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
								marginBottom={2}
								placeholder={`step ${index + 1}`}
								{...register(`steps[${index}]`)}
							/>
							<Button marginBottom={2} onClick={() => remove(index)}>
								Remove Step
							</Button>
						</div>
					))}
					<Button onClick={() => append('')}>Add Step</Button>
					<FormLabel htmlFor='ingredients'>Ingredients</FormLabel>
					{ingredients.map((item, index) => (
						<div key={item.id}>
							<Input
								marginBottom={2}
								type='text'
								placeholder={`ingredient ${index + 1} quantity`}
								{...register(`ingredients[${index}].required`)}
							/>
							<Text>Orderable Amounts</Text>
							<div>
								<Input
									marginBottom={2}
									type='text'
									placeholder={`ingredient ${index + 1} amount`}
									{...register(`ingredients[${index}].amount`, {
										setValueAs: (v) => parseFloat(v),
									})}
								/>
							</div>
							<Input
								marginBottom={2}
								type='text'
								placeholder={`ingredient ${index + 1} measurement(kg,gram etc)`}
								{...register(`ingredients[${index}].measurement`)}
							/>
							<Input
								marginBottom={2}
								placeholder={`ingredient ${index + 1} name`}
								{...register(`ingredients[${index}].name`)}
							/>
							<Input
								marginBottom={2}
								type='number'
								placeholder={`ingredient ${index + 1} price`}
								{...register(`ingredients[${index}].price`, {
									setValueAs: (v) => parseInt(v),
								})}
							/>

							<Button marginBottom={2} onClick={() => ingredientRemove(index)}>
								Remove Ingredient
							</Button>
						</div>
					))}
					<Button
						marginBottom={2}
						onClick={() => ingredientAppend({ name: '', price: '' })}>
						Add Ingredient
					</Button>

					<Input
						type='file'
						accept='jpg, .jpeg, .png'
						onChange={handleChange}
					/>

					{imageUrl && (
						<Image width={300} heigh={300} src={imageUrl} alt='Preview' />
					)}
					<div
						style={{
							display: 'flex',
							marginTop: 8,
						}}>
						<Button marginRight={6} onClick={handleUpload} disabled={showing}>
							{imageUrl ? 'Uploaded' : 'Upload'}
						</Button>

						<Button colorScheme='teal' isLoading={isSubmitting} type='submit'>
							Submit
						</Button>
					</div>
				</FormControl>
			</form>
		</Flex>
	);
};

export default AddRecipe;
