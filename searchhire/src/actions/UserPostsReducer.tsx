import axios from "axios"
import { apiUrl } from "../apiConfig";

export const actions = {
    getMasterUserPosts: async (id:number) => {
        const posts = await axios.get(`${apiUrl}/Post/GetPostsByMasterUserId/${id}`);
        return posts.data;
    },
    getUserPosts: async (id:number) => {
        const posts = await axios.get(`${apiUrl}/Post/GetPostsByUserId/${id}`);
        return posts.data;
    }
}