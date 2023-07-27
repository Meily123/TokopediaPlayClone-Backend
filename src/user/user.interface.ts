import {ObjectId} from "mongoose";

export interface IUser{
    id: ObjectId;
    username: string;
    password: string;
    imageUrl: string;
    token?: string;
}

export interface IUserRequest {
    username: string;
    password: string;
    imageUrl: string;
}

export interface IUserResponse {
    username: string;
    imageUrl: string;
}