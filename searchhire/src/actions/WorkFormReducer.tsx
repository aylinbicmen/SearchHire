import axios from "axios"
import { apiUrl } from "../apiConfig";
import { formatDateToString } from "../FormatDateToString";
import { SetStateAction } from "react";

let today = new Date();

export const actions = {
    getServices: async () => {
        const services = await axios.get(`${apiUrl}/Specialty`);
        return services.data;
    },
    handleChange: (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,setHook:React.Dispatch<SetStateAction<{}>>,value:{},id:number) => {
        setHook({...value,[e.target.id]:e.target.value,CreatedDate:formatDateToString(today),IsCompleted:false,UserId:id,IsActive:true,MasterUserId:0})
    },
    handleSubmit: (e:React.FormEvent<HTMLFormElement>,value:{},element:HTMLElement|null,elementDanger: HTMLElement|null) => {
        e.preventDefault();
        axios.post(`${apiUrl}/Post`,value).then(
            response => {
                if(response.status == 200){
                    element!.innerHTML = `
                    <div class="w-50 m-auto d-flex flex-column justify-content-center" style="height:50rem;">
                        <div class="alert alert-success p-4" role="alert">
                            <h4 class="alert-heading text-center">İş Formu Başarıyla Oluşturuldu!</h4>
                            <p class='text-center'>Profilinizden ilanlarınızı görebilirsiniz ya da anasayfaya devam edebilirsiniz.</p>
                            <div class='d-flex justify-content-center mt-3'>
                                <a href="/" role="button" class="btn btn-outline-success me-3"><i class="bi bi-house-fill"></i></a> 
                                <a href="/profile" role="button" class="btn btn-success">Profil</a>
                            </div>
                        </div>    
                    </div>
                    `; 
                }
            }).catch(() => {
                elementDanger!.innerHTML = `
                <div class="alert alert-danger w-50 text-center" role="alert">
                    İş Formu Oluşturulurken Bir Sorun Oluştu!
                </div>
                `;

                setTimeout(() => {
                    elementDanger!.innerHTML = "";
                }, 3000);
            });
    }
}