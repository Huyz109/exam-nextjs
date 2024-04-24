import styles from './sidebar.module.scss'
import AvatarImg from '../../assets/img/avatar.png'
import { Image, Button, Modal, message, Upload } from 'antd'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { GetProp, UploadProps, UploadFile } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/redux/hook';
import { useTranslation } from 'react-i18next';


export default function SideBar() {
    const { t } = useTranslation();
    const router = useRouter();
    const [avatar, setAvatar] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [isOpenModal, setIsOpen] = useState(false);
    const [sideData, setSideData] = useState<any>({});
    const dataState = useAppSelector(state => state.user);
    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    useEffect(() => {
      setSideData(dataState.data)
    }, [dataState]);

    const logOut = () => {
        Cookies.remove('token');
        router.push('/login');
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
  
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
      setFileList(newFileList);
  
    const uploadButton = (
      <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    );
    return (
        <>
            <div className={styles.sidebar}>
                <div className="info">
                    <div className={styles.sidebar__avatar}>
                        <img src={''} alt='avatar'/>
                    </div>
                    <div className={styles.user_info}>
                        <p className="username">User: {sideData?.email}</p>
                        <p className="point">Point: {sideData?.totalPoint}</p>
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
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-circle"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible:any) => setPreviewOpen(visible),
                      afterOpenChange: (visible: any) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                  />
                )}
            </Modal>
        </>
    )
}