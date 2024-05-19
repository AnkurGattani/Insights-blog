import conf from '../config/conf';
import { Client, Databases, Storage, Query, ID } from "appwrite";

class StorageService {
	client = new Client();
	databases; // for handling database operations
	bucket;	// for handling uploaded files like images, videos, etc.

	constructor() {
		this.client
			.setEndpoint(conf.appwriteURL)
			.setProject(conf.appwriteProjectID);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	// crete a new blog post
	async createPost({title, slug, content, featuredImage, status, userID}) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseID,	// database ID
				conf.appwriteCollectionID,	// collection ID
				slug,	// document ID
				{	// document data
					title,
					content,
					featuredImage,
					status,	
					userID
				}
			)
		} catch (error) {
			console.log("Error in Services :: createPost : ", error);
		}
	}

	// update an existing blog post using slug (document ID)
	async updatePost(slug, {title, content, featuredImage, status}) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseID,	// database ID
				conf.appwriteCollectionID,	// collection ID
				slug,	// document ID
				{	// updated document data
					title,
					content,
					featuredImage,
					status
				}
			)
		} catch (error) {
			console.log("Error in Services :: updatePost : ", error);
		}
	}

	// delete a blog post using slug (document ID)
	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseID,	// database ID
				conf.appwriteCollectionID,	// collection ID
				slug	// document ID
			)
			return true;	// return true if post is deleted successfully
		} catch (error) {
			console.log("Error in Services :: deletePost : ", error);
			return false;	// return false if post is not deleted
		}
	}

	// get a blog post using slug (document ID)
	async getPost(slug) {
		try {
			await this.databases.getDocument(
				conf.appwriteDatabaseID,	// database ID
				conf.appwriteCollectionID,	// collection ID
				slug	// document ID
			)
			return true;
		} catch (error) {
			console.log("Error in Services :: getPost : ", error);
			return false;
		}
	}

	// get all active/published blog posts
	async getAllPosts(queries = [Query.equal("status", "published")]) {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseID,	// database ID
				conf.appwriteCollectionID,	// collection ID
				queries	// query array to filter the documents
			)
		} catch (error) {
			console.log("Error in Services :: getAllPosts : ", error);
			return false;
		}
	}

	// file services
	// upload a file (image, video, etc.)
	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBucketID,	// bucket ID
				ID.unique(),	// file ID
				file	// file (image, video, etc.)
			);
		} catch (error) {
			console.log("Error in Services :: uploadFile : ", error);
		}
	}

	// delete a file using file ID
	async deleteFile(fileID) {
		try {
			await this.bucket.deleteFile(
			conf.appwriteBucketID,	// bucket ID
			fileID	// file ID
			);
			return true;
		} catch (error) {
			console.log("Error in Services :: deleteFile : ", error);
			return false;
		}
	}

	// get a preview of the file using file ID
	getFilePreview(fileID) {
		try {
			return this.bucket.getFilePreview(
				conf.appwriteBucketID,	// bucket ID
				fileID	// file ID
			);
		} catch (error) {
			console.log("Error in Services :: getFilePreview : ", error);
		}
	}

}

const storageService = new StorageService();
export default storageService;