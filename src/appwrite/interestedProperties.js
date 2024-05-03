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
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteInterestedUsersPropertiesCollectionId, ID.unique(),
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
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteInterestedUsersPropertiesCollectionId,
                [
                    Query.equal("user_id", [user_id]),
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: storeInterestedProperties :: error", error)
        }
    }

    async deleteInterestedProperties(id) {
        try {
            return await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteInterestedUsersPropertiesCollectionId, id,)
        } catch (error) {
            console.log("Appwrite service :: storeInterestedProperties :: error", error)
        }
    }

}

const interestedpropertiesService = new InterestedPropertiesService()
export default interestedpropertiesService;