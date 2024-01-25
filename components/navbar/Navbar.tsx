import styles from './Navbar.module.scss'
import Link from 'next/link'

export default function Navbar() {

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
                    <Link href="/login" style={{ fontWeight : 800, marginLeft : '20px' }}>
                        login
                    </Link>
                    <Link href="/games/upload" style={{ fontWeight : 800, marginLeft : '20px' }}>
                        upload
                    </Link>
                    <Link href="/games/*/edit" style={{ fontWeight : 800, marginLeft : '20px' }}>
                        login
                    </Link>
                </div>
                
                <button className={ styles.navbar__btn }>
                    로그인
                </button> 
            </div>
        </nav>
    )
}
