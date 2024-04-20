import conf from '../conf/conf.js'
import { Client, Account } from 'appwrite'

export class UpdateService {
    client = new Client();
    account = new Account(this.client);

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

    }

    async updateName(name) {
        try {
            return await this.account.updateName(name)

        } catch (error) {
            throw error;
        }
    }

    async updateEmail(password, newEmail) {
        try {
            return await this.account.updateEmail(newEmail, password)

        } catch (error) {
            console.log(error);
        }
    }

    async updatePhone(phone, password) {
        try {
            return await this.account.updatePhone(String(phone), password);

        } catch (error) {
            throw error;
        }
    }

    async updatePassword(newpassword, oldpassword) {
        try {
            return await this.account.updatePassword(newpassword, oldpassword)

        } catch (error) {
            throw error;
        }
    }


}

const updateService = new UpdateService();
export default updateService;