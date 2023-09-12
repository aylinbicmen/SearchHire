import axios from "axios"
import { apiUrl } from "../apiConfig";
import { formatDateToString } from "../FormatDateToString";
import { SetStateAction } from "react";

let today = new Date();

export const actions = {
    getMasterUser: async (id:string) => {
        const user = await axios.get(`${apiUrl}/User/${id}`);
        return user.data;
    },
    getProvinceByCity: async (cityId:string) => {
        const province = await axios.get(`${apiUrl}/Province/GetProvinceByCityId/${cityId}`);
        return province.data;
    },
    getCity: async (cityId:string) => {
        const city = await axios.get(`${apiUrl}/City/${cityId}`);
        return city.data;
    },
    handleChange: (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,setHook:React.Dispatch<SetStateAction<{}>>,value:{},userId:number,masterUserId:number,specialtyId:number) => {
        setHook({...value,[e.target.id]:e.target.value,CreatedDate:formatDateToString(today),IsCompleted:false,UserId:userId,IsActive:true,MasterUserId:masterUserId,specialtyId:specialtyId})
    },
    handleSubmit: (e:React.FormEvent<HTMLFormElement>,value:{},element: HTMLElement|null) => {
        e.preventDefault();
        console.log(value);
        axios.post(`${apiUrl}/Post`,value).then(
            response => {
                if(response.status == 200){
                    element!.innerHTML = `
                    <div class="alert alert-success mt-5 w-50" role="alert">
                        İş Formu Başarıyla Oluşturuldu!
                    </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = "";
                }, 3000);
                }
            }).catch(() => {
                element!.innerHTML = `
                <div class="alert alert-success mt-5 w-50" role="alert">
                    İş Formu Oluşturulurken Bir Sorun Oluştu!
                </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = "";
                }, 3000);
            });
    }
}