import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        const conversations = await prisma.conversetion.findMany({
            // сортировка по принципу - чем позднее было сообщение в диалоге,
            // тем выше должен стоять диалог
            orderBy: {
                lastMessageAt: 'desc'
            },
            // все чаты с текущим пользователем
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        // увидел пользователь сообщение или нет - массив,
                        // потому что в диалоге сообщение могут увидеть несколько пользователей
                        seen: true
                    }
                }
            }
        })
        return conversations;
    } catch (error: any) {
        return [];
    }
}

export default getConversations;