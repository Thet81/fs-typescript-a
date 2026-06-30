
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
export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

type Visibility = typeof Visibility[keyof typeof Visibility];
type NewDiary = Omit<Diary,'id'>;
const visibilityArr : Visibility[] = ['great','good','ok','poor']

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>("")

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
        // console.log(error.response?.data.error)
        let message = "Error : ";
        const errorObject = error.response?.data.error;
        console.log("error message is ", errorObject[0].code)
        message += errorObject[0].code + " : ";
        message += errorObject[0].path;
        setErrorMessage(message);
        // setErrorMessage(error.response?.data.error)
      }else {
        console.log(error)
      }
    })
  }

  const handleVisibilityChange = (event : React.ChangeEvent<HTMLInputElement>)=> {
    console.log(event.target.value);
    setVisibility(event.target.value);
  }

  const handleWeatherChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setWeather(event.target.value)
  }

  return (
    <div>
      {
        errorMessage && (<p>{errorMessage}</p>)
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
        {/* starts visibility section */}
        <p>
        <span> 
          great
       </span>
         <label> 
          great
         <input
          type="radio"
          name="visibility"
          value="great"
          onChange={handleVisibilityChange}
        />
       </label>

         <label> 
          good
         <input
          type="radio"
          name="visibility"
          value="good"
          onChange={handleVisibilityChange}
        />
       </label>
        <label> 
          ok
         <input
          type="radio"
          name="visibility"
          value="ok"
          onChange={handleVisibilityChange}
        />
       </label>
        <label> 
          poor
         <input
          type="radio"
          name="visibility"
          value="poor"
          onChange={handleVisibilityChange}
        />
       </label>
       </p>
       {/* end visibility section */}

       {/* starts weather sesction */}
       <p>
        weather
        <label>
          sunny 
          <input
            type='radio'
            name="weather"
            value='sunny'
            onChange={handleWeatherChange}
          />
        </label>
        <label>
          rainy 
          <input
            type='radio'
            name="weather"
            value='rainy'
            onChange={handleWeatherChange}          />
        </label>
        <label>
          cloudy 
          <input
            type='radio'
            name="weather"
            value='cloudy'
            onChange={handleWeatherChange}
          />
        </label>
        <label>
          stormy 
          <input
            type='radio'
            name="weather"
            value='stormy'
            onChange={handleWeatherChange}
          />
        </label>
        <label>
          windy 
          <input
            type='radio'
            name="weather"
            value='windy'
            onChange={handleWeatherChange}
          />
        </label>
       </p>
      {/* ends weather sesction */}
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
