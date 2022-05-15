import styles from './MovieTab.module.scss'
import cx from 'classnames'

import { useState } from 'hooks'

import MovieList from '../MovieList'

const MovieBookmark = () => {
  const [bookmark, setBookmark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('bookmark')
      if (saved !== null) {
        return JSON.parse(saved)
      }
    }
    return []
  })

  return (
    <section className={cx(styles.bookmark)}>
      <div className={cx(styles.title)}>즐겨찾기</div>
      {bookmark.length > 0 ? (
        <MovieList movieData={bookmark} setChangeState={setBookmark} cpntname='bookmark' />
      ) : (
        <div className={cx(styles.nodata)}>즐겨찾기된 영화가 없습니다.</div>
      )}
    </section>
  )
}

export default MovieBookmark
