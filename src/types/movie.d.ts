export interface ISearchMovie {
  Search: ISearch[]
  totalResults: string
  Response: string
}

export interface ISearch {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
