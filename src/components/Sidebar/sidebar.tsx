'use client'
import styles from './sidebar.module.scss'
import { Image, Button, Modal, message, Upload, Avatar } from 'antd'
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { GetProp, UploadProps, UploadFile } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/redux/hook';
import { useTranslations } from 'next-intl';


export default function SideBar() {
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname().split('/');
    const [avatar, setAvatar] = useState<string>('/avatar.png');
    const [isOpenModal, setIsOpen] = useState(false);
    const [sideData, setSideData] = useState<any>({});
    const dataState = useAppSelector(state => state.user);
    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    useEffect(() => {
      setSideData(dataState.data)
    }, [dataState]);

    const logOut = () => {
        Cookies.remove('token');
        router.push(`${pathname[1]}/login`);
    }

    const handleEditAvatar = () => {
        setIsOpen(true);
    }

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const getBase64 = (file: FileType): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
      
    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
      
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    };
  
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>  setFileList(newFileList);
    
    const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>{t('sidebar.upload')}</div>
      </button>
    );

    const handleOk = () => {
      setAvatar(previewImage);
      setPreviewImage('');
      setFileList([]);
      setIsOpen(!isOpenModal);
    }

    return (
        <>
            <div className={styles.sidebar}>
                <div className="info">
                    <div className={styles.sidebar__avatar}>
                        <Avatar src={avatar}/>
                    </div>
                    <div className={styles.user_info}>
                        <p className="username">{t('sidebar.user')}: {sideData?.email}</p>
                        <p className="point">{t('sidebar.point')}: {sideData?.totalPoint}</p>
                    </div>
                </div>
                <div className={styles.sidebar__btn}>
                    <Button type="text" className={styles.btn__logout + ' uppercase'} onClick={handleEditAvatar}>
                        {t('sidebar.editAvatar')}
                    </Button>
                    <Button type="text" htmlType="submit" className={styles.btn__logout + ' mt-5 uppercase'} onClick={logOut}>
                        {t('sidebar.logout')} 
                    </Button>
                </div>
            </div>
            <Modal
                open={isOpenModal}
                title={t('sidebar.editAvatar') + ' avatar'}
                onOk={handleOk}
                onCancel={() => setIsOpen(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn/>
                    <OkBtn />
                </>
                )}
                cancelText={t('sidebar.cancel')}
                className={styles.modal}
            >
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={file => {
                    const reader = new FileReader();
                    const fileUrl = URL.createObjectURL(file);
                    reader.readAsText(file);
                    setPreviewImage(fileUrl);
                    // Prevent upload
                    return false;
                }}
                >
                  {fileList.length > 0 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible:any) => setPreviewOpen(visible),
                      afterOpenChange: (visible: any) => !visible,
                    }}
                    src={previewImage}
                  />
                )}
            </Modal>
        </>
    )
}