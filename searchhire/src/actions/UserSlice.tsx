import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let obj:object = {};

export interface UserState {
  id:number,
  name:string,
  surname:string,
  email:string,
  phone:string,
  address:string,
  joinDate:string,
  workDone:number,
  isMasterUser:boolean,
  isActive:boolean,
  cityId:number,
  specialtyId: number
}

const initialState: UserState = {
  id:0,
  name:"",
  surname:"",
  email:"",
  phone:"",
  address:"",
  joinDate:"",
  workDone:0,
  isMasterUser:false,
  isActive:false,
  cityId:0,
  specialtyId:0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state,action: PayloadAction<string>) => {
        obj = JSON.parse(atob(action.payload.split('.')[1]));
        state.id = Number(obj['http://userdata/id' as keyof typeof obj]);
        state.name = obj['http://userdata/name' as keyof typeof obj];
        state.surname = obj['http://userdata/surname' as keyof typeof obj];
        state.email = obj['http://userdata/email' as keyof typeof obj];
        state.phone = obj['http://userdata/phone' as keyof typeof obj];
        state.address = obj['http://userdata/address' as keyof typeof obj];
        state.joinDate = obj['http://userdata/joindate' as keyof typeof obj];
        state.workDone = obj['http://userdata/workdone' as keyof typeof obj];
        state.isMasterUser = obj['http://userdata/ismasteruser' as keyof typeof obj] === "True" ? true : false;
        state.isActive = obj['http://userdata/isactive' as keyof typeof obj] === "True" ? true : false;
        state.cityId = Number(obj['http://userdata/city' as keyof typeof obj]);
        state.specialtyId = Number(obj['http://userdata/specialty' as keyof typeof obj]);
    },
    logout: () =>{
      localStorage.removeItem("token");
      return initialState;
    }
  },
})

export const { login,logout } = userSlice.actions

export default userSlice.reducer