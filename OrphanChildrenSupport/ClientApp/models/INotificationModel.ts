

export interface INotificationModel { 
    id: number;
    createdBy: string;
    createdTime: Date;
    lastModified: Date;
    modifiedBy: string;
    isDeleted: boolean;
    accountId: number;
    content: string;
    isSeen: boolean;
    seenTime: Date;
}