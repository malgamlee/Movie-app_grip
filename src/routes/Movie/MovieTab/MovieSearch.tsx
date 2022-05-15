import styles from './MovieTab.module.scss'
import cx from 'classnames'

import { useState } from 'hooks'
import { getSearchMovieApi } from 'services/movie'

import { ChangeEvent, FormEvent, useEffect } from 'react'

import { uniqBy } from 'lodash'

import MovieList from '../MovieList'
import { useRecoil } from 'hooks/state'
import { searchMovieListState } from 'states/movie'

const MovieSearch = () => {
  const [movieData, setMovieData, resetMovieData] = useRecoil(searchMovieListState)

  const [inputValue, setInputValue] = useState<string>('')

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isResponse, setIsResponse] = useState<string>('false')
  const [searchValue, setSearchValue] = useState<string>()

  const [overPageNumber, setOverPageNumber] = useState<boolean>(false)

  useEffect(() => {
    if (!searchValue) return
    setOverPageNumber(false)
    getSearchMovieApi({
      s: searchValue.toLowerCase(),
      page: pageNumber,
    }).then((res) => {
      // 더이상 로드될 데이터가 없을 때
      if (res.data.totalResults === undefined || Math.ceil(Number(res.data.totalResults) / 10) < pageNumber) {
        setOverPageNumber(true)
        return
      }
      if (res.data.Response === 'True') {
        setMovieData((prev) => uniqBy([...prev, ...res.data.Search], 'imdbID'))
      } else {
        resetMovieData()
      }
      setIsResponse(res.data.Response)
    })
  }, [searchValue, pageNumber])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setInputValue(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue === inputValue) return
    resetMovieData()
    setPageNumber(1)
    setSearchValue(inputValue)
  }

  useEffect(() => {
    resetMovieData()
    setPageNumber(1)
  }, [inputValue])

  return (
    <section className={cx(styles.search)}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className={styles.title}
          onChange={handleInputChange}
          value={inputValue}
          placeholder='영화 제목을 검색해보세요'
        />
        <button type='submit' className={cx(styles.searchbtn)}>
          검색
        </button>
      </form>
      {isResponse === 'True' || inputValue !== '' ? (
        <MovieList movieData={movieData} setChangeState={setPageNumber} cpntname='search' />
      ) : (
        <div className={styles.nodata}>검색결과가 없습니다.</div>
      )}
      {overPageNumber && <div className={cx(styles.loading)}>더이상 불러올 영화가 없습니다.</div>}
    </section>
  )
}

export default MovieSearch
