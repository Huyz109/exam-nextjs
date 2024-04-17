import Image from 'next/image'
import styles from './sidebar.module.scss'
import AvatarImg from '../../assets/img/avatar.png'
import { Button } from 'antd'
import { getLocalStorage, removeLocalStorage, removeSessionStorage } from '@/utils/storage'
import { useCookies } from 'next-client-cookies'
import { useRouter } from 'next/navigation'

export default function SideBar() {
    const cookies = useCookies();
    const router = useRouter();

    const logOut = () => {
        cookies.remove('token');
        router.push('/login');
    }

    return (
        <div className={styles.sidebar}>
            <div className="info">
                <div className={styles.sidebar__avatar}>
                    <Image src={AvatarImg} alt='avatar'/>
                </div>
                <div className={styles.user_info}>
                    <p className="username">User: thanhnh@gmail...</p>
                    <p className="point">Point: 2488</p>
                </div>
            </div>
            <div className={styles.sidebar__btn}>
                <Button type="text" htmlType="submit" className={styles.btn__logout} onClick={logOut}>
                        LOGOUT
                </Button>
            </div>
        </div>
    )
}