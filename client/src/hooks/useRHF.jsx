import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

export default function useRHF({ schema = {}, defaultValues = {} }) {
	const form = useForm({
		resolver: yupResolver(
			yup.object({
				...schema,
			})
		),
		defaultValues,
	});
	const {
		register,
		handleSubmit,
		control,
		formState,
		reset,
		getValues,
		setValue,
	} = form;
	const { errors } = formState;

	return {
		register,
		handleSubmit,
		control,
		errors,
		Controller,
		reset,
		useFieldArray,
		getValues,
		setValue,
	};
}
