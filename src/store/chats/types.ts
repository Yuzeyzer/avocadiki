export interface Istate {
	items: Ichat[];
	currentChat: Ichat;
}

export type searchChat = string;

export interface Ichat {
	id: number;
	sendBy: string;
	text: string;
	isOnline: boolean;
	lastMessage: string;
	profileImg: string;
}
