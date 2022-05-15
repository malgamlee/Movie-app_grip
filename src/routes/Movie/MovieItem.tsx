import styles from './Movie.module.scss'
import cx from 'classnames'

import { MouseEvent } from 'react'
import { ISearch } from 'types/movie'
import { BookmarkIcon } from 'assets/svgs'

interface Props {
  movieItem: ISearch
  btnClick: (e: MouseEvent<HTMLButtonElement>) => void
  check: boolean
}

const MovieItem = ({ movieItem, btnClick, check }: Props) => {
  return (
    <li>
      <button
        className={cx(styles.movieItemWrapper)}
        type='button'
        onClick={btnClick}
        data-item={JSON.stringify(movieItem)}
        value='movie'
      >
        <div className={cx(styles.moviePoster)}>
          <img alt={`${movieItem.Title} poster`} src={movieItem.Poster} />
        </div>
        <div className={cx(styles.movieContent)}>
          <p>{movieItem.Title}</p>
          <div className={cx(styles.info)}>
            {movieItem.Year} &#183; {movieItem.Type}
          </div>
        </div>
        <BookmarkIcon className={cx(styles.bookmarkIcon, { [styles.marked]: check })} />
      </button>
    </li>
  )
}

export default MovieItem
