import conf from '../conf/conf.js'
import { Client, ID, Databases, Query } from 'appwrite'

export class InterestedPropertiesService {
    client = new Client();
    databases = new Databases(this.client);

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
    }

    async storeInterestedProperties(property_id, user_id) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserInterestedPropertiesCollectionId,
                ID.unique(),
                {
                    user_id,
                    property_id
                }
            )
        } catch (error) {
            console.log("Appwrite service :: storeInterestedProperties :: error", error)
        }
    }

    async getInterestedProperties(user_id) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserInterestedPropertiesCollectionId,
                [
                    Query.equal("user_id", [user_id]),
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: getInterestedProperties :: error", error)
        }
    }

    async deleteInterestedProperties(id) {
        try {
            return await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteUserInterestedPropertiesCollectionId, id)
        } catch (error) {
            console.log("Appwrite service :: deleteInterestedProperties :: error", error)
        }
    }

}

const interestedpropertiesService = new InterestedPropertiesService()
export default interestedpropertiesService;