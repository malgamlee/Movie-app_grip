import { axios } from 'hooks/worker'
import { ISearchMovie } from 'types/movie'

const MOVIE_BASE_URL = 'http://www.omdbapi.com'

interface Params {
  s: string
  page: number
}
// http://www.omdbapi.com/?apikey=92e32667&s={검색어}&page={페이지번호(1~100)}
export const getSearchMovieApi = (params: Params) =>
  axios.get<ISearchMovie>(`${MOVIE_BASE_URL}/?`, {
    params: {
      apikey: process.env.REACT_APP_MOVIE_APP_ID,
      ...params,
    },
  })
