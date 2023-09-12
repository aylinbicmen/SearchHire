import axios from "axios"
import { apiUrl } from "../apiConfig";

export const actions = {
    getTopServices: async () => {
        const services = await axios.get(`${apiUrl}/Specialty`);
        return services.data.slice(0, 20);
    },
    userSubscribe: (email:string,element: HTMLElement|null) => {
        axios.put(`${apiUrl}/User/UserSubscribe/${email}`).then(response => {
            if (response.status == 200) {
                element!.innerHTML = `
                <div class="alert alert-success w-75 mt-5 text-center" role="alert">
                    Haber Bültenimize Başarıyla Kayıt Oldunuz!
                </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = "";
                }, 3000);
            }
        }).catch(() => {
            element!.innerHTML = `
                <div class="alert alert-danger w-75 mt-5 text-center" role="alert">
                    Haber Bültenimize Kayıt Olurken Bir Sorun Oluştu!
                </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = "";
                }, 3000);
        })
    }
}