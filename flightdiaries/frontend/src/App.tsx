
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
const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const;

type Visibility = typeof Visibility[keyof typeof Visibility];
type Weather = typeof Weather[keyof typeof Weather];

type NewDiary = Omit<Diary,'id'>;
const visibilityArr : Visibility[] = ['great','good','ok','poor']
const weatherArr : Weather[] = ['sunny','rainy','cloudy','stormy','windy']

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
        {
          visibilityArr.map(item => (
          <>
            <label key={item}>
              {item}
              <input name="visibility" type='radio' value={item} onChange={handleVisibilityChange}/>
            </label>
          </>
          ))
        }
        {/* end visibility section */}
      <p>
       {/* starts weather sesction */}
         {
          weatherArr.map(item => (
          <>
            <label key={item}>
              {item}
              <input name="weather" type='radio' value={item} onChange={handleWeatherChange}/>
            </label>
          </>
          ))
        }
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
