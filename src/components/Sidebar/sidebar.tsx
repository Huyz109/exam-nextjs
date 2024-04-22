import Image from 'next/image'
import styles from './sidebar.module.scss'
import AvatarImg from '../../assets/img/avatar.png'
import { Button, Modal, message, Upload } from 'antd'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { GetProp, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default function SideBar() {
    const router = useRouter();
    const [avatar, setAvatar] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [isOpenModal, setIsOpen] = useState(false);

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const logOut = () => {
        Cookies.remove('token');
        router.push('/login');
    }

    const handleEditAvatar = () => {
        setIsOpen(true);
    }

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
      };
    
    const beforeUpload = (file: FileType) => {
        console.log(file);
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      };

      const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj as FileType, (url: any) => {
            setLoading(false);
            setAvatar(url);
          });
        }
      };

      const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      );

    return (
        <>
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
                    <Button type="text" className={styles.btn__logout} onClick={handleEditAvatar}>
                            EDIT
                    </Button>
                    <Button type="text" htmlType="submit" className={styles.btn__logout + ' mt-5'} onClick={logOut}>
                            LOGOUT
                    </Button>
                </div>
            </div>
            <Modal
                open={isOpenModal}
                title="Upload avatar"
                // onOk={handleOk}
                onCancel={() => setIsOpen(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    <OkBtn />
                </>
                )}
                className={styles.modal}
            >
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    beforeUpload={beforeUpload}
                    onChange    ={handleChange}
                >
                    {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Modal>
        </>
    )
}