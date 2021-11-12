import { Message } from "./message";

export class ChatRoom {
    public id: string;
    public firstUserMySqlId: number;
    public secondUserMySqlId: number;
    public firstUserEmail: string;
    public secondUserEmail: string;
    public messages: Message[];
    public updated: Date;
}