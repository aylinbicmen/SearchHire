import axios from "axios"
import { apiUrl } from "../apiConfig";

export const actions = {
    getResults: async (searchData:string) => {
        const posts = await axios.get(`${apiUrl}/Post/GetPostsWithSearch/${searchData}`);
        return posts.data;
    }
}