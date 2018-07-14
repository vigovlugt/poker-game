import { MessageType } from "../shared/modules/Enums";

export interface IMessage{
    text: string,
    type: MessageType
}