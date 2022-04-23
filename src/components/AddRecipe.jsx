import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from '@chakra-ui/react';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const AddRecipe = () => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: '',
			steps: [' '],
			ingredients: [{ name: '', price: '' }],
			description: '',
			imageUrl: '',
		},
	});
	const { fields, insert, remove, append } = useFieldArray({
		name: 'steps',
		control,
	});
	const {
		fields: ingredients,
		append: ingredientAppend,
		remove: ingredientRemove,
	} = useFieldArray({ name: 'ingredients', control });
	const onSubmit = (values) => {
		console.log(values);
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
								placeholder={`ingredient ${index + 1} price`}
								{...register(`ingredients[${index}].price`)}
							/>
							<Button onClick={() => ingredientRemove(index)}>-</Button>
						</div>
					))}
					<Button onClick={() => ingredientAppend({ name: '', price: '' })}>
						+
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
