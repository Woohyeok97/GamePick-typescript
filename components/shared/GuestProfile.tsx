import Link from 'next/link'
import styles from './GuestProfile.module.scss'

export default function GuestProfile() {

    return (
        <div className={ styles.guestProfile }>
                <span>로그인하고 관심게임 선택하기</span>

                <Link href={'/login'}>
                    <button className='btn'>로그인</button>
                </Link>
        </div>
    )
}