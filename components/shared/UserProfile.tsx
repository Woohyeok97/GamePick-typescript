import styles from './UserProfile.module.scss'
import { Session } from "next-auth"
import Image from 'next/image'


interface UserProfileProps {
    session : Session,
}

export default function UserProfile({ session } : UserProfileProps) {
    const { user } = session

    return (
        <div className={ styles.userProfile }>
            <div className={ styles.userProfile__info }>
                <span className={ styles.userProfile__name }>{ user?.name }</span>
                <span className={ styles.userProfile__email }>{ user?.email }</span>
            </div>
            <div>
            { user?.image && <Image src={ user?.image } alt='user-img' width={100} height={100}/> }
            </div>
        </div>
    )
}