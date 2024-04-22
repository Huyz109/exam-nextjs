'use client'
import SideBar from '@/components/Sidebar/sidebar'
import { Input, Dropdown, Button, Space, Pagination, Select } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';
import styles from './dashboard.module.scss'
import Image from 'next/image';
import RingIcon from '@/assets/img/clock-icon.png'
import RewardIcon from '@/assets/img/reward-icon.png'
import Cookies from 'js-cookie';
import { redirect, useRouter, usePathname, useSearchParams} from 'next/navigation';
import { useCallback } from 'react';
import type { PaginationProps } from 'antd';


export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isCookies = Cookies.get('token');
  if(!isCookies) {
    redirect('/login')
  }

  const { Search } = Input;
  const items = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Hard', label: 'Hard' },
    ]   
  
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

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if(value) {
        params.set(name, value)
      }
      else {
        params.delete(name);
      }
      return params.toString()
    },
    [searchParams]
  )

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    router.push(pathname + '?' + createQueryString('search', value))

  };

  const onSelect = (value: string) => {
    router.push(pathname + '?' + createQueryString('select', value))
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    router.push(pathname + '?' + createQueryString('page', page.toString()))
  };

  return (
    <div className={styles.layout}>
            <SideBar />
            <div className={styles.dashboard}>
                <div className={styles.filter}>
                    <Search placeholder="Search" 
                            allowClear 
                            defaultValue={searchParams.get('search') || ''}
                            onSearch={onSearch} 
                            className={styles.search__bar}
                    />
                    <Select
                        onChange={onSelect}
                        options={items}
                        value={searchParams.get('select') || "Difficult"}
                    />
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
                 <Pagination defaultCurrent={Number(searchParams.get('page'))} total={50} onChange={onChange} />
                </div>
            </div>
        </div>
  )
}
