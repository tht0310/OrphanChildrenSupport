export interface IEngineEntity {
  id?: number;
  createdBy?: string;
  createdTime?: string | Date | null;
  lastModified?: string | Date | null;
  modifiedBy?: string;
  isDeleted?: boolean;
}
