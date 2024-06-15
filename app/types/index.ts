import { Conversetion, Message, User } from "@prisma/client";


export type FullMessageType = Message & {
    sender: User,
    // увидел пользователь сообщение или нет - массив,
    // потому что в диалоге сообщение могут увидеть несколько пользователей
    seen: User[]
}

// потому что в getConversations добавляем
export type FullConversationType = Conversetion & {
    users: User[],
    messages: FullMessageType[]
}