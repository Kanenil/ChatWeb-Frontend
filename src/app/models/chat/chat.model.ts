import {IUserModel} from "../user/user.model";
import {IMessageModel} from "../message/message.model";

export interface IChatModel {
  id: number,
  name: string,
  image: string,
  users?: IUserModel[],
  lastMessage: IMessageModel
}
