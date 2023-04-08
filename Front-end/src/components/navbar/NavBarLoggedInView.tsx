import React from 'react'
import { User } from '../../models/user'
import { logout as logoutApi} from '../../api/notesApi'
import { Button, Navbar } from 'react-bootstrap';
interface NavBarLoggedInViewProps {
    user: User,
    onLogOutSuccessful: () => void,
}

function NavBarLoggedInView({ user, onLogOutSuccessful }: NavBarLoggedInViewProps) {
  
    const logout =async () => {
        try {
            await logoutApi();
            onLogOutSuccessful();
        } catch (error) {
            console.error(error, "123123123123");
            alert(error);
        }
    }
    return (
    <>
    <Navbar.Text className='me-2'>
        Signed In as: {user.username}
    </Navbar.Text>
    <Button onClick={logout}>
        LogOut
    </Button>
    </>
  )
}

export default NavBarLoggedInView