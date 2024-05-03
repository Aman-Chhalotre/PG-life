import conf from '../conf/conf.js'
import { Client, Account, ID, Databases, Permission, Role } from 'appwrite'




export class AuthService {
    client = new Client();
    account = new Account(this.client);
    databases = new Databases(this.client);

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

    }

    async createAccount(email, password, name) {
        try {
            return await this.account.create(ID.unique(), email, password, name)

        } catch (error) {
            throw error;
        }
    }
    async getPrefs() {
        try {
            return await this.account.getPrefs();

        } catch (error) {
            throw error;
        }

    }
    async updatePref(label) {
        try {
            return await this.account.updatePrefs({ 'label': label })

        } catch (error) {
            throw error;
        }

    }

    async storePhone(Phone, password) {
        try {
            return await this.account.updatePhone(Phone, password)
        } catch (error) {
            throw error;
        }
    }


    async creatUserDocument(data) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserDetailCollectionId,
                ID.unique(),
                {
                    email: String(data.email),
                    name: String(data.fullname),
                    phone: String(data.phoneNumber),
                    college_name: String(data.collegeName),
                    city: String(data.city),
                    gender: String(data.gender)
                },
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.any()),
                    Permission.delete(Role.any()),
                ]
            )
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password)

        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }

    async getCurrentUserData() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;