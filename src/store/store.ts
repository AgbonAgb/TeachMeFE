import { atomWithStorage } from "jotai/utils";

export interface UserData {
	UserType?: string;
	UserId?: string;
	Message?: string;
	StatusCode?: number;
    Token?: string;
}

export const userAtom = atomWithStorage<UserData | undefined>("teach-me-app", JSON.parse(localStorage.getItem("teach-me-app")!) ?? undefined);



