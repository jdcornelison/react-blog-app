import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { format } from 'date-fns'
import api from './api/posts'
import DataContext from './context/DataContext'

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')

  const { posts, setPosts } = useContext(DataContext)
  const navigate = useNavigate()

  const { id } = useParams()
  const post = posts.find(post => post.id.toString() === id)

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])

  const handleEdit = async id => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.patch(`/posts/${id}`, updatedPost)
      setPosts(
        posts.map(post => (post.id === id ? { ...response.data } : post))
      )
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  return (
    <main className='NewPost'>
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={e => e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input
              type='text'
              name='postTitle'
              id='postTitle'
              required
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
            />

            <label htmlFor='postBody'>Post:</label>
            <textarea
              name='postBody'
              id='postBody'
              required
              value={editBody}
              onChange={e => setEditBody(e.target.value)}
            ></textarea>

            <button type='submit' onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to='/'>Back to Home</Link>
          </p>
        </>
      )}
    </main>
  )
}

export default EditPost
