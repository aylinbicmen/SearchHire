import React from "react";
import { apiUrl } from "../apiConfig";
import axios from "axios";
import { CityType, ProvinceType } from "../type";

let province:ProvinceType;
let city:CityType;

export const actions = {
    handleSubmit: (e:React.FormEvent<HTMLFormElement>,value:{},id:number,element:HTMLElement|null) => {
        e.preventDefault();
        axios.put(`${apiUrl}/User/${id}`,value).then(
            response => {
                if(response.status == 200){
                    element!.innerHTML = `
                        <div class="alert alert-success w-50" role="alert">
                            Bilgileriniz Başarıyla Düzenlendi!
                        </div>
                    `;

                    setTimeout(() => {
                        element!.innerHTML = "";
                    }, 3000);
                }
            }).catch(() => {
                element!.innerHTML = `
                        <div class="alert alert-danger w-50" role="alert">
                            Bilgilerinizi Düzenlerken Hata Oluştu!
                        </div>
                    `;

                    setTimeout(() => {
                        element!.innerHTML = "";
                    }, 3000);
            });
    },
    getAllProvinces: async () => {
        const provinces = await axios.get(`${apiUrl}/Province`);
        return provinces.data;
    },
    getCitiesByProvince: async (provinceId:number) => {
        const cities = await axios.get(`${apiUrl}/City/GetCitiesByProvince/${provinceId}`);
        return cities.data;
    },
    getUserProvince: (cityId:number) => {
        axios.get(`${apiUrl}/City/${cityId}`).then(
            response =>{
                city = response.data;
                axios.get(`${apiUrl}/Province/${city.provinceId}`).then(result => {
                    province = result.data;
                    return province.id;
                }).catch(() => {
                    return 0;
                })
            })
    },
    getSpecialties: async () => {
        const specialties = await axios.get(`${apiUrl}/Specialty`);
        return specialties.data;
    }
}