import React, { Dispatch, SetStateAction} from "react";
import { apiUrl } from "../apiConfig";
import axios from "axios";
import { login } from "./UserSlice";
import { NavigateFunction } from "react-router-dom";

export const actions = {
    handleChange: (e:React.ChangeEvent<HTMLInputElement>,setHook:React.Dispatch<SetStateAction<string>>,value:string) => {
        setHook(value);
    },
    handleSubmit: (e:React.FormEvent<HTMLFormElement>,email:string,password:string,dispatchFunction:Dispatch<any>,navigateFunction:NavigateFunction,element: HTMLElement|null) => {
        e.preventDefault();
        axios.post(`${apiUrl}/User/${email}/${password}`).then(
            response => {
                if(response.status == 200){
                    dispatchFunction(login(response.data));
                    localStorage.setItem("token",response.data);
                    let obj = JSON.parse(atob(response.data.split('.')[1]));

                    if(obj['http://userdata/ismasteruser' as keyof typeof obj] === "True"){
                        navigateFunction("/profile");
                    }
                    else{
                        navigateFunction("/services");
                    }
                }
            }).catch(err => {
                element!.innerHTML = `
                <div class="alert alert-danger pe-5 ps-5 pt-3 pb-3" role="alert">
                    Giriş Yaparken Hata Oluştu! Lütfen Tekrar Deneyin.
                </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = "";
                }, 3000);
            })
    }
}