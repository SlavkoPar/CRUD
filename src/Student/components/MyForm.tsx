import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IStudent } from '../types';

interface IFormProps {
	entity: IStudent;
	formMode: string;
	canEdit: boolean;
	cancel: () => void;
	saveForm: (student: IStudent) => void;
	edit: () => void;
	remove: () => void;	
 }

export const MyForm: React.FC<IFormProps> = (props: IFormProps) => {
  const formik = useFormik({
	enableReinitialize: true,
   initialValues: {
		fromMode: props.formMode,
		canEdit: props.canEdit,
      id: props.entity.id,
		url: props.entity.url,
		code: props.entity.code,
		avatar: props.entity.avatar,
		name: props.entity.name,
		email: props.entity.email,
		types: props.entity.types,
   },
   validationSchema: Yup.object({
      code: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
   }),
   onSubmit: (values) => {
		// values.name = values.firstName.trim() + ' ' + values.lastName.trim()
		// alert(JSON.stringify(values, null, 2));
		props.saveForm(values)
   },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
		 { props.formMode !== 'add' && 
		 <>
			<label htmlFor="id">Student id</label>
			<input
			id="id"
			name="id"
			type="text"
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
			value={formik.values.id}
			disabled
			style={{width: '50px'}}
			/>
			{formik.touched.id && formik.errors.id ? (
			<div>{formik.errors.id}</div>
			) : null}
			</>
		}

		<label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.name}
		  disabled = {props.formMode === 'display'}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <label htmlFor="code">Code</label>
      <input
        id="code"
        name="code"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.code}
		  disabled = {props.formMode === 'display'}
      />
      {formik.touched.code && formik.errors.code ? (
        <div>{formik.errors.code}</div>
      ) : null}

		<label htmlFor="lastName">Avatar</label>
      <input
        id="avtar"
        name="avtar"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.avatar}
		  disabled = {props.formMode === 'display'}
      />
      {formik.touched.avatar && formik.errors.avatar ? (
        <div>{formik.errors.avatar}</div>
      ) : null}		

		<label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.email}
		  disabled = {props.formMode === 'display'}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}		


		{ props.formMode !== 'display' &&
			<>
			<button onClick={() => props.cancel()}>Cancel</button>
      	<button type="submit">Save</button>
			</>
		}

		{ props.canEdit && props.formMode === 'display' &&
			<>
			<button onClick={() => props.edit()}>Edit</button>
			<button onClick={() => props.remove()}>Remove</button>
			</>
		}				

    </form>
  );
};

