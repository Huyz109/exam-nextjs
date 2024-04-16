'use client'
import { Input, Button, Checkbox } from 'antd';
import styles from './exam.module.scss'


export default function Exam() {
    const { Search } = Input;
    const dataContent = {
            id: 3,
            question: "Nhân viên chính thức của công ty Amela được nghỉ phép (có hưởng lương) bao nhiêu ngày một năm?",
            answers: [
                "12 ngày nếu làm đủ cả năm",
                "16 ngày nếu làm đủ cả năm",
                "Không có nghỉ phép vẫn hưởng lương",
                "8 ngày nếu làm đủ cả năm"
            ]
    };
    const questionsListLength = 16;
    const questionDone = [1, 2, 4, 7];
    const questionActive = 3;

    const questionList = Array.from({length: questionsListLength}, (v, i) => {
            if(i === questionActive - 1) {
                return (
                    <div key={i} className={styles.question_item + ' ' + styles.question_active}>
                        <a>{i +1}</a>
                    </div>)
            }
            else {
                return (
                <div key={i} className={styles.question_item + ' '+ (questionDone.includes(i+1) ? styles.question_done : '')}>
                    <a>{i +1}</a>
                </div>)
            }
        }
    )

    return (
        <div className={styles.exam + ' grid grid-cols-12'}>
            <div className={styles.container + ' col-span-9 grid grid-rows-6'}>
                <header className={styles.header + ' row-span-1'}>
                    <p className={styles.header_title + ' font-bold mb-2'}>Kiểm tra an toàn bảo mật thông tin lần 2</p>
                    <p className='mb-1'>Còn lại: 14 phút 22 giây</p>
                    <div className={styles.time_bar}>
                        <div className={styles.time_left}></div>
                    </div>
                </header>
                <div className={styles.content + ' row-span-5'}>
                    <div className={styles.question_box}>
                        <p className='font-bold mb-7'>Câu {dataContent.id}. {dataContent.question}</p>
                        <div className={styles.answer_list}>
                            {dataContent.answers.map((answer, index) => <div key={index} className={styles.answer}>
                                <Checkbox />{String.fromCharCode(index+65)}. {answer}
                            </div>)}
                        </div>
                    </div>
                    <div className={styles.btn_list + ' flex '}>
                        <Button className={styles.btn_pre}>Câu trước</Button>
                        <Button className={styles.btn_next}>Câu sau</Button>
                    </div>
                </div>
            </div>
            <div className={styles.sidebar + ' col-span-3'}>
                <div className={styles.question_list + ' grid grid-cols-5 gap-3'}>
                    {questionList}
                </div>
                <div className={styles.btn_box}>
                    <Button className={styles.btn_submit}>Nộp bài</Button>
                </div>
            </div>
        </div>
    )
}