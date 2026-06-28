
import React,{ useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

interface Diary {
  id : number;
  date : string;
  weather : string;
  visibility : string;
  comment : string
}

type NewDiary = Omit<Diary,'id'>
function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState([])

  useEffect(()=> {
    axios.get<Diary[]>('/api/diaries').then(response => {
      setDiaries(response.data)
    })
  },[])

  const create = (object : NewDiary) => {
    return axios.post<Diary>('/api/diaries',object).then(response => {
      return response;
    })
  }

  const createDiary = (event : React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToBeAdded = {
      date,
      visibility,
      weather,
      comment
    }
    create(diaryToBeAdded).then(response => {
      setDiaries(diaries.concat(response.data))
    }).catch(error => {
      if(axios.isAxiosError(error)){
        console.log(error.status)
        console.log(error.response?.data.error)
        setErrorMessage(error.response?.data.error)
        // setErrorMessage(error.response?.data.error)
      }else {
        console.log(error)
      }
    })
  }

  return (
    <div>
      {
        errorMessage && (<p>{errorMessage.map(error => <li>{error.code}</li>)}</p>)
      }
      <h1>Add new Entry</h1>
      <form onSubmit={createDiary}>
       <p>
        <label>
        date
         <input
          value={date}
          type="date"
          onChange={({target}) => setDate(target.value)}
        />
       </label>
       </p>
       <p>
         <label>
        visibility 
         <input
          value={visibility}
          onChange={({target}) => setVisibility(target.value)}
        />
       </label>
       </p>
       <p>
         <label>
        weather 
         <input
          value={weather}
          onChange={({target}) => setWeather(target.value)}
        />
       </label>
       </p>
       <p>
         <label>
        comment 
         <input
          value={comment}
          onChange={({target}) => setComment(target.value)}
        />
       </label>
       </p>
       <button type='submit'>add</button>
      </form>
    <div>
       <ul>
       {
          diaries.map(diary => {
            return (
              <div key={diary.id}>
                <h3>{diary.date}</h3>
                <p>visibility : {diary.visibility}</p>
                <p>weather : {diary.weather}</p>
                <p>{diary.comment}</p>
              </div>
            )
          })
        }
     </ul>
    </div>
    </div>
  )
}

export default App
