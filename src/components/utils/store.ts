import { atomWithStorage } from "jotai/utils";

export interface UserData {
	AdminUserHasChangePassword?: boolean;
	FirstName?: string;
	Id?: string;
	Message?: string;
	Role?: string[];
	StatusCode?: number;
    Token?: string;
	UserName?: string;
	expiryDate?: string;
	RoleIds?:string[];
	SettingPageNumber?:number;
	RoleNames?:string[];
}

export const userAtom = atomWithStorage<UserData | undefined>("member-admin-user", JSON.parse(localStorage.getItem("member-admin-user")!) ?? undefined);
