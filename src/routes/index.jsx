import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
import Movie from './Movie'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Movie />}>
            <Route path=':tab' element={<Movie />} />
          </Route>
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
