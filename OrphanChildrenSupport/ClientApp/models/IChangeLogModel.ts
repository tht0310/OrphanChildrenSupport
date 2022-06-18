import { IEngineEntity } from "./IEngineEntity";

export interface IChangeLogModel extends IEngineEntity {
    api: string;
    service: string;
}