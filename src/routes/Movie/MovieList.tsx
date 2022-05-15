import styles from './Movie.module.scss'
import cx from 'classnames'
import { ISearch } from 'types/movie'

import MovieItem from './MovieItem'
import { UIEvent, MouseEvent, SetStateAction, useRef, useState, useEffect } from 'react'

import { debounce, find } from 'lodash'

import MovieModal from './MovieModal'

interface Props {
  movieData: ISearch[]
  setChangeState: (e: SetStateAction<number>) => void
  cpntname: string
}

const MovieList = ({ movieData, setChangeState, cpntname }: Props) => {
  const scrollRef = useRef<HTMLUListElement>(null)

  const [isDrag, setIsDrag] = useState<boolean>(false)
  const [startY, setStartY] = useState<number>(0)

  const [modaltype, setModaltype] = useState<string>('add')

  const [bookmark, setBookmark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('bookmark')
      if (saved !== null) {
        return JSON.parse(saved)
      }
    }
    return []
  })

  const [newBookmark, setNewBookmark] = useState('')
  const [clickId, setClickId] = useState<string>()
  const [isModal, setIsModal] = useState<Boolean>(false)

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget

    if (cpntname === 'search') {
      if (scrollHeight - scrollTop === clientHeight) {
        setChangeState((prev) => prev + 1)
      }
    }
  }

  // 클릭하여 드래그
  const onDragStart = (e: MouseEvent<HTMLUListElement>) => {
    e.preventDefault()
    if (scrollRef.current === null) return
    setIsDrag(true)
    setStartY(e.pageY + scrollRef.current.scrollTop)
  }

  const onDragEnd = () => {
    setIsDrag(false)
  }

  const onDragMove = (event: MouseEvent<HTMLUListElement>) => {
    if (isDrag) {
      if (scrollRef.current === null) return
      scrollRef.current.scrollTop = startY - event.pageY
    }
  }

  const onDebounceDragMove = debounce(onDragMove, 10)

  // 클릭 이벤트
  const handleClickModal = (e: MouseEvent<HTMLButtonElement>) => {
    const { value, dataset } = e.currentTarget
    setIsModal((prev) => !prev)
    if (value === 'close') {
      setNewBookmark('')
    } else if (value === 'add') {
      setBookmark([...bookmark, newBookmark])
    } else if (value === 'delete') {
      const newArr = bookmark.filter((item: ISearch) => String(item.imdbID) !== clickId)
      if (cpntname === 'bookmark') {
        setChangeState(newArr)
      }
      setBookmark(newArr)
    } else if (value === 'movie') {
      const jsonMovie = JSON.parse(dataset.item || '')
      setNewBookmark(jsonMovie)
      setClickId(jsonMovie.imdbID)

      const isBookmarked = find(bookmark, function (o) {
        return o.imdbID === jsonMovie.imdbID
      })

      setModaltype(isBookmarked !== undefined ? 'delete' : 'add')
    }
  }

  useEffect(() => {
    window.localStorage.setItem('bookmark', JSON.stringify(bookmark))
  }, [bookmark])

  return (
    <div className={cx(styles.list)}>
      <ul
        className={cx(styles.movieList)}
        aria-hidden='true'
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDebounceDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onScroll={handleScroll}
      >
        {movieData?.map((item: ISearch) => (
          <MovieItem
            key={item.imdbID}
            movieItem={item}
            btnClick={handleClickModal}
            check={bookmark.find((x: ISearch) => x.imdbID === item.imdbID) !== undefined}
          />
        ))}
      </ul>
      <MovieModal isModalOpen={isModal} btnClick={handleClickModal} modaltype={modaltype} />
    </div>
  )
}

export default MovieList
