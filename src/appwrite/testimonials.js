import conf from '../conf/conf.js'
import { Client, ID, Databases, } from 'appwrite'

export class TestimonialService {
    client = new Client();
    databases = new Databases(this.client);

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
    }

    async storeTestimonial(property_id, user_name, content) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteTestimonialsCollectionId, ID.unique(),
                {
                    property_id,
                    user_name,
                    content
                }
            )
        } catch (error) {
            console.log("Appwrite service :: storeImages :: error", error)
        }
    }
    async getTestimonials(property_id, user_name, content) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteTestimonialsCollectionId)
        } catch (error) {
            console.log("Appwrite service :: storeImages :: error", error)
        }
    }
}

const testimonialService = new TestimonialService()
export default testimonialService;