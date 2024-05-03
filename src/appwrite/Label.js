// // const sdk = require('node-appwrite');
// import * as sdk from 'node-appwrite';
// import conf from '../conf/conf.js'

// export class LabelService {

//     client = new sdk.Client()

//     users = new sdk.Users(this.client)

//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId)
//             .setKey(conf.appwriteApiKey)
//     }

//     async storeLabel(userId, label) {
//         try {
//             return await this.users.updateLabels(
//                 userId,
//                 [label]
//             )
//         } catch (error) {
//             console.log("Appwrite service :: updateLabel :: error", error)
//         }
//     }

// }

// const labelService = new LabelService()
// export default labelService;