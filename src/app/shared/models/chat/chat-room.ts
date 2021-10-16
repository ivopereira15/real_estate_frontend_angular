import { Message } from "./message";

export class ChatRoom {
    public Id: string;
    public FirstUserMySqlId: number;
    public SecondUserMySqlId: number;
    public FirstUserEmail: string;
    public SecondUserEmail: string;
    public Messages: Message[];
    public Updated: Date;
}