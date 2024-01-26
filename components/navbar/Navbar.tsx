'use client'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const session = useSession()

    return (
        <nav className={ styles.navbar }>
            <div className={ styles.navbar__container }>
                <Link href="/" className={ styles.navbar__logo }>
                    로고
                </Link>

                <div>
                    임시 : 
                    <Link href="/games" style={{ fontWeight : 800, marginLeft : '20px' }}>
                        games
                    </Link>
                    <Link href="/games/upload" style={{ fontWeight : 800, marginLeft : '20px' }}>
                        upload
                    </Link>
                    <Link href="/mypage" style={{ fontWeight : 800, marginLeft : '20px' }}>
                        myPage
                    </Link>
                </div>
                
                { session?.data ?
                    <button className={ styles.navbar__btn } onClick={() => signOut()}>
                        로그아웃
                    </button>
                    :
                    <Link href="/login">
                        <button className={ styles.navbar__btn }>
                            로그인
                        </button> 
                    </Link>
                }
            </div>
        </nav>
    )
}
