import axios from "axios"
import { apiUrl } from "../apiConfig";

export const actions = {
    getPostDetail: async (id:string) => {
        const post = await axios.get(`${apiUrl}/Post/${id}`);
        return post.data;
    },
    setMasterUserId: (postId:number,masterUserId:number,element: HTMLElement|null) => {
        axios.put(`${apiUrl}/Post/PostMasterUserIdUpdate/${postId}/${masterUserId}`).then(response => {
            if (response.status == 200) {
                element!.innerHTML = `
                <div class="alert alert-success" role="alert">
                    İşi Başarıyla Aldınız!
                </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = "";
                }, 3000);
            }
        }).catch(() => {
            element!.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    İşi Alırken Bir Sorun Oluştu!
                </div>
                `;

                setTimeout(() => {
                    element!.innerHTML = `
                        <button type="button" class="btn btn-danger" onClick={() => actions.setMasterUserId(Number(id),user.id,messageElement)}>İşi Al</button>
                    `;
                }, 3000);
        })
    }
}