import axios from "axios"
import { apiUrl } from "../apiConfig";

export const actions = {
    getPostDetail: async (id:string) => {
        const post = await axios.get(`${apiUrl}/Post/${id}`);
        return post.data;
    },
    setAsCompleted: (postValue:{},postId:number,masterUserId:number,element: HTMLElement|null) => {
        axios.put(`${apiUrl}/Post/${postId}`,postValue).then((response) => {
            if(response.status == 200){
                
                element!.innerHTML = `
                <div class="alert alert-success mt-5 text-center" role="alert">
                    İlan Başarıyla Tamalandı Olarak İşaretlendi!
                </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = "";
                }, 3000);

                if(masterUserId != 0){
                    axios.put(`${apiUrl}/User/MasterUserWorkDone/${masterUserId}`);
                }
            }
        }).catch(() => {
            element!.innerHTML = `
                <div class="alert alert-danger mt-5 text-center" role="alert">
                    İlan Tamamlandı Olarak İşaretlenirken Bir Sorun Oluştu!
                </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = "";
                }, 3000);
        })
    },
    deletePost: (postValue:{},postId:number,element: HTMLElement|null) => {
        axios.put(`${apiUrl}/Post/${postId}`,postValue).then((response) =>{
            if(response.status == 200){

                element!.innerHTML = `
                <div class="alert alert-success mt-5 text-center" role="alert">
                    İlan Başarıyla Silindi!
                </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = "";
                }, 3000);

            }
        }).catch(() => {
            element!.innerHTML = `
                <div class="alert alert-danger mt-5 text-center" role="alert">
                    İlan Silinirken Bir Sorun Oluştu!
                </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = "";
                }, 3000);
        })
    }
}