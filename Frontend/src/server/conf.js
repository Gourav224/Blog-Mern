import config from "../confi/config.js"
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const database = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
            return database;
        }
        catch (e) {
            console.log("Appwrite service :: createPost :: error", e);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service::updatePost::Error: ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwritecollectionId,
                slug,
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service::DeletePost::Error: ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwritecollectionId,
                slug,
            );
        } catch (error) {
            console.log("Appwrite Service::getPost::Error: ", error);
            return false;
        }
    }
    async getAllPost(queries = [Query.equal('status', "active"),]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwritecollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service::getAllPost::Error: ", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            );

        } catch (error) {
            console.log("Appwrite Service::uploadFile::Error: ", error);

            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId,
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service::deleteFile::Error: ", error);

            return false;
        }
    }
    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId,
            );
        } catch (error) {
            console.log("Appwrite Service::getFilePreview::Error: ", error);
            return false;
        }
    }

}

const service = new Service();
export default service;