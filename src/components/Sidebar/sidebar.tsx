import Image from 'next/image'
import styles from './sidebar.module.scss'
import AvatarImg from '../../assets/img/avatar.png'
import { Button } from 'antd'

export default function SideBar() {
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
                <Button type="text" htmlType="submit" className={styles.btn__logout}>
                        LOGOUT
                </Button>
            </div>
        </div>
    )
}