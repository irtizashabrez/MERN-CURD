import React from 'react'
import { Button } from 'react-bootstrap'

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
}

function NavBarLoggedOutView({onSignUpClicked, onLogInClicked}: NavBarLoggedOutViewProps) {
  return (
    <>
        <Button onClick={onSignUpClicked}>Sign Up</Button>
        <Button onClick={onLogInClicked}>LogIn</Button>
    </>
  )
}

export default NavBarLoggedOutView