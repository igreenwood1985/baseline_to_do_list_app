import { useState} from 'react'
import { useCookies } from 'react-cookie'


const Modal = ({mode = 'create', setShowModal, getData, task}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)  
    const editMode = mode === 'edit' ? true : false

    const [data, setData] = useState({
      user_email: editMode ? task.user_email : cookies.Email,   //editMode && task ? task.user_email : "",
      title: editMode ? task.title : null,             //editMode && task ? task.title : "",
      progress: editMode ? task.progress : 50,         //editMode ? task?.progress ?? "50" : "50", // 
      date: editMode ? task.date : new Date().toISOString().slice(0, 10) //toISOString onward is a modification to get past an error
    })

    const postData = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data)

        })
        if (response.status === 200){
          console.log('WORKED')
          setShowModal(false)
          getData()
        }
      } catch(err) {
        console.error(err)
      }
    }

    //Fetched tasks through server from SQL database for users to edit
    const editData = async(e) => {
      e.preventDefault()
      try{
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
          method: 'PUT',
          headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify(data)
        })
        if (response.status === 200) {
          setShowModal(false)
          getData()
        }
      } catch (err) {
          console.error(err)
      }
    }

    

    function handleChange (e) {
      const {name, value} = e.target

      setData(data => ({
        ...data,
        [name] : value
      }))

      console.log(data)

    }

    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} your task</h3>
            <button onClick={() => setShowModal(false)}>X</button>
          </div>

          <form>
            <input
              required
              maxLength={30}
              placeholder=" Your task goes here"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
            <br/>
            <label htmlFor="range">Drag to select your current progress</label> 
            <input
              required
              type="range"
              id="range"
              min="0"
              max="100"
              name="progress"
              value={data.progress}
              onChange={handleChange}
            /> 
            <input className={mode} type="submit" onClick={editMode ? editData : postData}/>
          </form>

        </div>
      </div>
    )
  }
  
  export default Modal