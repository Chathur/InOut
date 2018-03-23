export class authUserDataModel
{
    expires: string;
    issued: string;
    access_token: string;
    designation: string;
    email: string;
    expires_in: number;
    firstName: string;
    id: string;
    lastName: string;
    permissions: string;
    role: string;
    token_type: string;
}

export enum attendanceTypeEnum
{
    In = 0,
    Out = 1
}