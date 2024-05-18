import conf from '../config/conf';
import { Client, Account, ID } from "appwrite";

class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
					.setEndpoint(conf.appwriteURL)
					.setProject(conf.appwriteProjectID);
		this.account = new Account(this.client);
	}

	async signUp({email, password, name}) {
		try {
			const userAccount = await this.account.create(ID.unique(), email, password, name);

			if(userAccount) {
				// if user account is created successfully, call logIn method to create the user session
				return this.login({email, password});

			}
			else {
				// throw new Error('User account not created');
				return userAccount;
			}
		} catch (error) {
			console.log('Error in Services :: signUp : ', error);
		}
	}

	async login({email, password}) {
		try {
			return await this.account.createEmailSession(email, password);
			
		} catch (error) {
			console.log('Error in Services :: logIn : ', error);
		}
	}

	async getCurrentUser() {
		try {
			return this.account.get();
		} catch (error) {
			console.log('Error in Services :: getCurrentUser: ', error);
		}
		return null
	}

	async logoutCurrentDevice() {
		try {
			return await this.account.deleteSession('current');
		} catch (error) {
			console.log('Error in Services :: logoutCurrentDevice : ', error);
		}
	}

	async logoutAllDevices() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			console.log('Error in Services :: logoutAllDevices : ', error);
		}
	}
}

const authService = new AuthService();

export default authService;