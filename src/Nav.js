import { useContext } from 'react'
import DataContext from './context/DataContext'
import { Link } from 'react-router-dom'

const Nav = () => {
  const { search, setSearch } = useContext(DataContext)
  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={e => e.preventDefault()}>
        <label htmlFor='search'>Search Posts</label>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='Search Posts'
          role='searchbox'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/post'>Post</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
