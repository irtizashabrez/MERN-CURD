import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { signUp, SignUpCredentials } from '../api/notesApi'
import { User } from '../models/user'
import TextInputField from './form/TextInputField';
import './signUpModal.css'

interface SignUpModalProps {
  onDismiss: () => void,
  onSignUpSuccessful: (user: User) => void,
}
function SignUpModal({onDismiss, onSignUpSuccessful}: SignUpModalProps) {
  
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<SignUpCredentials>();
  
  const OnSubmit =async (credentials: SignUpCredentials) => {
    try {
      const newUser = await signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Sign Up 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(OnSubmit)}>
          <TextInputField 
            name='username'
            label='Username'
            type='text'
            placeholder='Username'
            register={register}
            registerOptions={{required: 'Required'}}
            error={errors.username}
          />
          <TextInputField 
            name='email'
            label='Email'
            type='email'
            placeholder='Email'
            register={register}
            registerOptions={{required: 'Required'}}
            error={errors.email}
          />
          <TextInputField 
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{required: 'Required'}}
            error={errors.password}
          />
          <Button type='submit' disabled={isSubmitting} className= "width100">
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal