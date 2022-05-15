import { atom } from 'recoil'
import { ISearch } from 'types/movie'

export const searchMovieListState = atom<ISearch[]>({
  key: '#searchMovieState',
  default: [],
})
