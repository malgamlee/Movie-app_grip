import cx from 'classnames'
import styles from './Movie.module.scss'
import { Link, NavLink, useParams } from 'react-router-dom'

import MovieSearch from './MovieTab/MovieSearch'
import MovieBookmark from './MovieTab/MovieBookmark'

import { SearchIcon, BookmarkIcon } from 'assets/svgs'

const Movie = () => {
  const { tab } = useParams<{ tab: string }>()

  return (
    <main className={cx(styles.movie)}>
      {!tab && <MovieSearch />}
      {tab === 'bookmark' && <MovieBookmark />}
      <nav className={cx(styles.lnb)}>
        <ul>
          <li>
            <Link to='' className={cx({ [styles.isActive]: !tab })}>
              <SearchIcon className={cx(styles.tabicon)} />
              <div className={cx(styles.tabtitle)}>검색</div>
            </Link>
          </li>
          <li>
            <NavLink to='bookmark' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
              <BookmarkIcon className={cx(styles.tabicon)} />
              <div className={cx(styles.tabtitle)}>즐겨찾기</div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </main>
  )
}

export default Movie
