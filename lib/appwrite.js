import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.mgo.hexcraft',
  projectId: '6637eefc0030256e5c11',
  databaseId: "6637f0bc00251d3723ce",
  userCollectionId: '6637f0dc003ca8c27d12',
  videoCollectionId: '6637f10f001cda2ee265',
  storageId: "6637f2ee003c630aa924"
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appwriteConfig;

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform)
  ;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    // await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )

    return newUser;

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const signIn = async (email, password) => {
  try {
    const sessionn = await account.createEmailPasswordSession(email, password)
    return sessionn;
  } catch (error) {
    throw new Error(error);
  }
}


export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error)
  }

}

export const getAllPost = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}