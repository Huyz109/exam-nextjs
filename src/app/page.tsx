'use client'
import SideBar from '@/components/Sidebar/sidebar'
import { Input, Dropdown, Button, Space, Pagination } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import styles from './dashboard.module.scss'
import Image from 'next/image';
import SearchIcon from '@/assets/img/search-icon.png'
import RingIcon from '@/assets/img/clock-icon.png'
import RewardIcon from '@/assets/img/reward-icon.png'
import { redirect } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import Cookies from 'js-cookie';

export default function Home() {
  const cookies = useCookies();

  const isCookies = Cookies.get('token');
  if(!isCookies) {
    redirect('/login')
  }

  const { Search } = Input;
  const items: MenuProps['items'] = [
      {
        key: '1',
        label: '1st item',
      },
      {
        key: '2',
        label: '2nd item',
      },
      {
        key: '3',
        label: '3rd item',
      },
    ];
  
  const dataContent = [
    {   
        id: 1,
        name: 'Kiểm tra an toàn bảo mật thông tin 2...',
        time: 7,
        minPoint: 200,
        maxPoint: 250,
        difficult: 4 
    },
    {
        id: 2,
        name: 'Kiểm tra an toàn bảo mật thông tin 2...',
        time: 7,
        minPoint: 200,
        maxPoint: 250,
        difficult: 4 
    },
    {
        id: 3,
        name: 'Kiểm tra an toàn bảo mật thông tin 2...',
        time: 7,
        minPoint: 200,
        maxPoint: 250,
        difficult: 4 
    },
    {
        id: 4,
        name: 'Kiểm tra an toàn bảo mật thông tin 2...',
        time: 7,
        minPoint: 200,
        maxPoint: 250,
        difficult: 4 
    },
    {
        id: 5,
        name: 'Kiểm tra an toàn bảo mật thông tin 2...',
        time: 7,
        minPoint: 200,
        maxPoint: 250,
        difficult: 4 
    },
    {
        id: 6,
        name: 'Kiểm tra an toàn bảo mật thông tin 2...',
        time: 7,
        minPoint: 200,
        maxPoint: 250,
        difficult: 4 
    }
  ]
    
  const STAR_MAX = 5;

  return (
    <div className={styles.layout}>
            <SideBar />
            <div className={styles.dashboard}>
                <div className={styles.filter}>
                    <div className={styles.search__bar}>
                        <input type='text' placeholder='Search'/>
                        <div className={styles.search_icon_box}>
                            <Image src={SearchIcon} alt=''/>
                        </div>
                    </div>
                    <Dropdown menu={{ items }}>
                        <Button>
                            <Space>
                            Difficult
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
                <div className={styles.content + ' grid grid-cols-2 gap-10 justify-items-center'}>
                    {dataContent.map(item => {
                        const starFill = Array.from({length: item.difficult}, (v, i) => <StarFilled key={i}/>)
                        const starEmpty = Array.from({length: (STAR_MAX - item.difficult)}, (v, i) => <StarOutlined key={i}/>)

                        return (
                        <div className={styles.content_card + ' w-10/12'} key={item.id}>
                            <p className='font-medium mb-1'>{item.name}</p>
                            <div className='flex w-full'>
                                <p className='flex text-sm items-center mr-6'><Image src={RingIcon} alt='' className={styles.content_icon}/> {item.time} phút</p>
                                <p className='flex text-sm items-center'><Image src={RewardIcon} alt='' className={styles.content_icon}/> {item.minPoint}/{item.maxPoint} điểm</p>
                            </div>
                            <div className='flex text-2xl pt-4'>
                                {starFill} {starEmpty}
                            </div>
                        </div>
                    )})}
                </div>
                <div className={styles.pagination}>
                 <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </div>
  )
}
