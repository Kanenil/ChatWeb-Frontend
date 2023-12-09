import {IUserModel} from "../user/user.model";

export interface IMessageModel {
  id: number,
  content: string,
  fileName: string,
  dateCreated: string,
  user: IUserModel
}
