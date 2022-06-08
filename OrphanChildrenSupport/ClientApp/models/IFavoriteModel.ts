import { IEngineEntity } from "./IEngineEntity";

export interface IFavoriteModel extends IEngineEntity { 
    childrenProfileId: number;
    accountId: number;
}