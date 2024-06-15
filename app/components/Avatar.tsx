'use client'

import { User } from "@prisma/client";
import Image from "next/image";

interface Props {
    user?: User;
}

function makeAvatarFromUserNameInitials(name: string) {
    let res = '';
    if (!name.includes(' ')) return name.slice(0, 1).toUpperCase()

    const clearName = name.replace(/[^ \p{L}]/gu, ''); // Удалять все символы, кроме пробелов и букв
    console.log(clearName)
    for (let i=0; i<clearName.length; i++) {
        if (res.length === 0 || clearName[i - 1] === ' ') {
            res += clearName[i].toUpperCase()
        }
    }

    return res.length > 2 ? res.slice(0, 2) : res
}

const Avatar: React.FC<Props> = ({user}) => {
    console.log(makeAvatarFromUserNameInitials(user?.name!))
    return (
        <div className="relative">
            <div
                className="
                    relative
                    inline-block
                    rounded-full
                    overflow-hidden
                    h-9
                    w-9
                    md:h-11
                    md:w-11
                "
            >
                <Image
                    alt="Avatar"
                    src={user?.image || '/images/placeholder.jpg'}
                    fill
                />
            </div>
            <span 
                className="
                    absolute
                    block
                    rounded-full
                    bg-green-500
                    ring-2
                    ring-white
                    top-0
                    right-0
                    h-2
                    w-2
                    md:h-3
                    md:w-3
                "
            />
        </div>
    )
}

export default Avatar;