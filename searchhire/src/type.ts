export type SpecialtyType = {
    id: number,
    name: string,
    imageName: string
}

export type ProvinceType = {
    id: number,
    name: string
}

export type CityType = {
    id: number,
    name: string,
    provinceId:number,
}

export type PostType = {
    id: number,
    title: string,
    description: string,
    createdDate: string,
    isCompleted: boolean,
    masterUserId: number,
    userId: number,
    specialtyId: number,
    isActive: boolean
}

export type PostListType = {
    posts: {
        id: number,
        title: string,
        description: string,
        createdDate: string,
        isCompleted: boolean,
        masterUserId: number,
        userId: number,
        specialtyId: number
    }[]
}

export type UserType = {
    id: number,
    name: string,
    surname: string,
    workDone: number,
    cityId: number,
    specialtyId: number,
    isMasterUser: boolean
}

