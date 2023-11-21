import {ITokenModel} from "./token.model";

export interface IAuthResponseModel {
  tokens: ITokenModel,
  expires: string
}
