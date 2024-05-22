
import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query, Permission, Role } from 'appwrite'

export class PropertyService {
    client = new Client();
    databases = new Databases(this.client);
    storage = new Storage(this.client)

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
    }

    async createProperty(name, address, description, gender, rent, city_name, amenities, userId) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwritePropertiesCollectionId,
                ID.unique(),
                {
                    name,
                    address,
                    description,
                    gender,
                    rent,
                    city_name,
                    amenities
                },
                [
                    Permission.read(Role.user(userId)),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId))
                ]

            )
        } catch (error) {
            console.log("Appwrite service :: createProperty :: error", error);

        }

    }
    async storeImages(file) {
        try {
            return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite service :: storeImages :: error", error)
        }
    }
    async storePropertyImages(image_url, properties_id) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwritePropertiesImagesCollectionId,
                ID.unique(),
                {
                    image_url,
                    properties_id
                }
            )
        } catch (error) {
            console.log("Appwrite service :: storePropertyImages :: error", error)
        }
    }
    async getProperties() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritePropertiesCollectionId
            )
        } catch (error) {
            console.log("Appwrite service :: getProperties :: error", error)
        }
    }
    async getImageUrl(id) {
        try {
            const result = this.storage.getFilePreview(conf.appwriteBucketId, id)
            return result
        } catch (error) {
            console.log("Appwrite service :: getImageUrl :: error", error)
        }
    }
    async setThumbnailImage(documentId, url, userId) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwritePropertiesCollectionId,
            documentId,
            {
                thumbnail_image: url
            },
            [
                Permission.update(Role.user(userId))
            ]
        )
    }

    async getPropertiesImages() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritePropertiesImagesCollectionId
            )
        } catch (error) {
            console.log("Appwrite service :: getPropertiesImages :: error", error)
        }
    }
    async searchProperties(city) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritePropertiesCollectionId,
                [],
                10,
                0,
                [
                    Query.search('city_name', [city])
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: searchProperties :: error", error)
        }
    }
}

const propertyService = new PropertyService()
export default propertyService;