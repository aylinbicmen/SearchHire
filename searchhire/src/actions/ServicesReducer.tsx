import axios from "axios"
import { apiUrl } from "../apiConfig";

export const actions = {
    getServices: async () => {
        const services = await axios.get(`${apiUrl}/Specialty`);
        return services.data;
    }
}