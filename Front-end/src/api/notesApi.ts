import axios from "axios";
import { Note as NoteModel } from "../models/note";
import { User as UserModel } from "../models/user";

const BASE_URL = "http://localhost:5000/api/notes";
const BASE_URL_2 = "http://localhost:5000/api/users";

export const loadNotes = async () => {
	const response = await axios
		.get<NoteModel[], any>(`${BASE_URL}/`)
		.catch((error) => {
			if (error.response) {
				return Promise.reject(error.response.data);
			} else {
				return Promise.reject(error);
			}
		});
	if (response) return response.data;
};

export interface NoteInput {
	title: string;
	text?: string;
}

export const createNote = async (note: NoteInput) => {
	const response = await axios
		.post<NoteModel, any>(`${BASE_URL}`, note)
		.catch((error) => {
			if (error.response) {
				return Promise.reject(error.response.data);
			} else {
				return Promise.reject(error);
			}
		});
	if (response) return response.data;
};

export const deleteNote = async (noteId: string) => {
	await axios
		.delete(`${BASE_URL}/${noteId}`)
		.catch((error) => {
			if (error.response) {
				return Promise.reject(error.response.data);
			} else {
				return Promise.reject(error);
			}
		});
};

export const updatedNote = async (noteId: string, note: NoteInput) => {
	const response = await axios
		.patch(`${BASE_URL}/${noteId}`, note)
		.catch((error) => {
			if (error.response) {
				return Promise.reject(error.response.data);
			} else {
				return Promise.reject(error);
			}
		});
	if (response) return response.data;
};

export const getLoggedInUser = async (): Promise<UserModel> => {
	const response = await axios.get<UserModel, any>(`${BASE_URL_2}/`)
	.catch((error) => {
		console.log("working 1")
		if (error.response) {
			return Promise.reject(error.response.data);
		} else {
			return Promise.reject(error);
		}
	});
	console.log("its hitting ->", response);
	// since backend and frontend are on the same url so the cookies
	// will be send automaticly otherwise we have to include the credentials   
	return response.data;
};

export interface SignUpCredentials {
	username: string,
	email: string,
	password: string,
};

export const signUp =async (credentials: SignUpCredentials): Promise<UserModel> => {
	const response = await axios.post<UserModel, any>(`${BASE_URL_2}/signup`, credentials)
	.catch((error) => {
		if (error.response) {
			console.log(error.response.data, "signUp issue");
			return Promise.reject(error.response.data);
		} else {
			return Promise.reject(error);
		}
	});
	return response.data
};

export interface LoginCredentials {
	username: string,
	password: string,
};

export const login =async (credentials: LoginCredentials): Promise<UserModel> => {
	console.log("data -> ", credentials);
	const response = await axios.post<UserModel, any>(`${BASE_URL_2}/login`, credentials)
	.catch((error) => {
		if (error.response) {
			console.log(error.response.data, "login issue");
			return Promise.reject(error.response.data);
		} else {
			return Promise.reject(error);
		}
	});
	console.log("im getting this user now", response.data);

	return response.data;

};

export const logout =async () => {
	const response = await axios.get(`${BASE_URL_2}/`);
	console.log("this should not work")
	return response.data;
};