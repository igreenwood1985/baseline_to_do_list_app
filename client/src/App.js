import ListHeader from '../src/components/ListHeader'
import ListItem from '../src/components/ListItem'
import Auth from '../src/components/Auth'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken
  const [tasks, setTasks] = useState(null);


  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${encodeURIComponent(userEmail)}`)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
      if (authToken) {
        getData()
      }}
    , []);

  console.log(tasks)

  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
        <>
        <ListHeader listName={'Holiday Tick List'} getData={getData}/>
        <p className="user-email">Welcome back {userEmail}</p>
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
        </>}
        <p className="copyright">Gensanity Dev LLC</p>
    </div>
  )
}

export default App
