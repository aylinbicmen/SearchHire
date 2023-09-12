import axios from "axios"
import { apiUrl } from "../apiConfig";

export const actions = {
    getMasters: async (specialtyId:string,cityId:string) => {
        const masterUsers = await axios.get(`${apiUrl}/User/MasterUsers/${specialtyId}/${cityId}`);
        return masterUsers.data;
    }
}