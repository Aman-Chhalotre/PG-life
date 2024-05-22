const conf = {
    appwriteApiKey: String(import.meta.env.VITE_APPWRITE_API_KEY),
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCitiesCollectionId: String(import.meta.env.VITE_APPWRITE_CITIES_COLLECTION_ID),
    appwritePropertiesCollectionId: String(import.meta.env.VITE_APPWRITE_PROPERTIES_COLLECTION_ID),
    appwriteAmenitiesCollectionId: String(import.meta.env.VITE_APPWRITE_AMENITIES_COLLECTION_ID),
    appwritePropertiesAmenitiesCollectionId: String(import.meta.env.VITE_APPWRITE_PROPERTIES_AMENITIES_COLLECTION_ID),
    appwriteUserInterestedPropertiesCollectionId: String(import.meta.env.VITE_APPWRITE_USER_INTERESTED_PROPERTIES_COLLECTION_ID),
    appwriteTestimonialsCollectionId: String(import.meta.env.VITE_APPWRITE_TESTIMONIALS_COLLECTION_ID),
    appwritePropertiesImagesCollectionId: String(import.meta.env.VITE_APPWRITE_PROPERTIES_IMAGES_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}

export default conf