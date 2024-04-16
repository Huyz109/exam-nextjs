'use client'
import { Modal } from 'antd';
import styles from './exam.module.scss'


export default function ExamFinish() {
    const data = {
        title: 'Kiểm tra an toàn bảo mật thông tin lần 2',
        trueAnswers: 12,
        wrongAnswers: 3,
        notTrueAnswers: 1,
        totalAnswers: 16
    }

    const handleOk = () => {

      };
    

    return (
        <div className={styles.exam_finish + ' grid grid-cols-12'}>
            <Modal title={data.title} open={true} onOk={handleOk} className={styles.modal_result}>
                
            </Modal>
        </div>
    )
}