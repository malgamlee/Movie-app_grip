import styles from './Movie.module.scss'
import cx from 'classnames'

import { MouseEvent } from 'react'

interface Props {
  isModalOpen: Boolean
  btnClick: (e: MouseEvent<HTMLButtonElement>) => void
  modaltype: string
}

const MovieModal = ({ isModalOpen, btnClick, modaltype }: Props) => {
  return (
    <div className={cx(styles.modal, { [styles.open]: isModalOpen })}>
      <div className={cx(styles.modalBox)}>
        <div className={cx(styles.modalContent)}>
          즐겨찾기{modaltype === 'add' ? '에 추가' : '를 삭제'}하시겠습니까?
        </div>
        <div className={cx(styles.modalContent)}>
          <button className={cx(styles.modalBtn)} type='button' value={modaltype} onClick={btnClick}>
            즐겨찾기 {modaltype === 'add' ? '추가' : '삭제'}
          </button>
          <button className={cx(styles.modalBtn)} type='button' value='cancel' onClick={btnClick}>
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
