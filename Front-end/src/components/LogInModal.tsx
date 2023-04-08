import { useState } from 'react'
import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials, login } from "../api/notesApi";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import './signUpModal.css'

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

function LogInModal({ onDismiss, onLoginSuccessful }: LoginModalProps) {
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

  const onSubmit =async (credentials:LoginCredentials) => {
    try {
      const newUser = await login(credentials);
      onLoginSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Log In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{required: 'Required'}}
            error={errors.password}
          />
          <Button type='submit' disabled={isSubmitting} className= "width100">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LogInModal