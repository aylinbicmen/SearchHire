import React, { SetStateAction} from "react";
import { apiUrl } from "../apiConfig";
import axios from "axios";
import { formatDateToString } from "../FormatDateToString";

let today = new Date();

export const actions = {
    handleChange: (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,setHook:React.Dispatch<SetStateAction<{}>>,value:{}) => {
        
        let updatedValue = e.target.value;

        if (updatedValue === "true" || updatedValue === "false") {
            updatedValue = JSON.parse(updatedValue);
        }
        
        setHook({...value,[e.target.id]:updatedValue,JoinDate:formatDateToString(today),IsActive:true,WorkDone:0})
    },
    handleSubmit: (e:React.FormEvent<HTMLFormElement>,value:{},element:HTMLElement|null,elementDanger:HTMLElement|null) => {
        e.preventDefault();
        axios.post(`${apiUrl}/User`,value).then(
            response => {
                if(response.status == 200){
                    element!.innerHTML = `
                    <div class="w-75 m-auto d-flex flex-column justify-content-center" style="height:55rem;">
                        <div class="alert alert-success p-4" role="alert">
                            <h4 class="alert-heading text-center">Üyeliğiniz Başarıyla Tamamlandı!</h4>
                            <p class='text-center'>Üye girişi sayfasına devam edebilir ya da anasayfaya gidebilirsiniz.</p>
                            <div class='d-flex justify-content-center mt-3'>
                                <a href="/" role="button" class="btn btn-outline-success me-3"><i class="bi bi-house-fill"></i></a> 
                                <a href="/login" role="button" class="btn btn-success">Giriş Yap</a>
                            </div>
                        </div>    
                    </div>
                    `; 
                }
            }).catch(() => {
                elementDanger!.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Üye Olurken Bir Hata Oluştu!
                </div>
                `;

                setTimeout(() => {
                    elementDanger!.innerHTML = "";
                }, 3000);
            });
    }
}