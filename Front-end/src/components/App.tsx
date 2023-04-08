import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getLoggedInUser } from "../api/notesApi";
import { User } from "../models/user";
import "./app.css";
import LogInModal from "./LogInModal";
import NavBar from "./navbar/NavBar";
import NotesPageLoggedInView from "./note/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./note/NotesPageLoggedOutView";
import SignUpModal from "./SignUpModal";

function App() {

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
	const [showSignedUpModal, setShowSignedUpModal] = useState(false);
	const [showLogInModal, setShowLogInModal] = useState(false);

	// const [showSignUpModal, setShowSignUpModal] = useState(false);
	// const [showLoginModal, setShowLoginModal] = useState(false);

	useEffect(() => {
		const fetchLoggedInUser = async () => {
			try {
				const user = await getLoggedInUser();
				setLoggedInUser(user);
			} catch (error) {
				console.log(error);
			}
		}
		fetchLoggedInUser();
	}, [])

	return (
		<div>
			<NavBar
				loggedInUser={loggedInUser}
				onLogInClicked={() => setShowLogInModal(true)}
				onLogOutSuccessful={() => setLoggedInUser(null)}
				onSignUpClicked={() => setShowSignedUpModal(true)}
				// loggedInUser={loggedInUser}
					// onLoginClicked={() => setShowLoginModal(true)}
					// onSignUpClicked={() => setShowSignUpModal(true)}
					// onLogoutSuccessful={() => setLoggedInUser(null)}
			/>
			<Container className="notesPage">
				<>
					{loggedInUser
						? <NotesPageLoggedInView />
						: <NotesPageLoggedOutView />
					}
				</>
			</Container>
			{showSignedUpModal &&
				<SignUpModal
					onDismiss={() => setShowSignedUpModal(false)}
					onSignUpSuccessful={(user) => {
						setLoggedInUser(user);
						setShowSignedUpModal(false);
					}}
				/>
			}
			{showLogInModal &&
				<LogInModal
					onDismiss={() => setShowLogInModal(false)}
					onLoginSuccessful={(user) => {
						setLoggedInUser(user);
						setShowLogInModal(false);
					}}
				/>
			}
		</div>
	);
}

export default App;
