import axios from "axios"
import { apiUrl } from "../apiConfig";

export const actions = {
    getPostsBySpecialty: async (id:string) => {
        const posts = await axios.get(`${apiUrl}/Post/GetPostsBySpecialtyId/${id}`);
        return posts.data;
    }
}