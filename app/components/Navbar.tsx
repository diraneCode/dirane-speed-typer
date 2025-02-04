
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { useSession, signIn, signOut } from 'next-auth/react'

import Image from 'next/image'
import * as Icon from 'react-icons/fa'
import { Button } from '../../components/ui/button'


export default function Navbar() {
    const { data: session } = useSession()
    return (
        <div className="w-full p-1 flex justify-end items-center space-x-4 absolute top-0">
            {
                session ? (<div className="w-full p-1 flex justify-end items-center space-x-4 absolute top-0">
                    <span className="font-bold text-white">{session.user?.name}</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='size-8 bg-orange-300 rounded-full border-none overflow-hidden'>
                            {session.user?.image && <Image src={session.user?.image} className='w-full h-full' alt={session.user?.image} width={100} height={100} />}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-red-600 border-none text-white peer-hover:bg-red-600/80'>
                            <DropdownMenuLabel>
                                <button className="w-full h-full" onClick={() => signOut()}>Deconnexion</button>
                            </DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>) :
                    <Button onClick={() => signIn("google")} className="w-fit">
                        <Icon.FaGoogle /> Se connecter 
                    </Button>
            }
        </div>
    )
}