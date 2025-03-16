import  React, { useState , useEffect } from 'react'
import "../scss/Home.scss"

// inspired from https://medium.com/create-a-clocking-in-system-on-react/create-a-react-app-displaying-the-current-date-and-time-using-hooks-21d946971556

export const DateTime = () => {

  const [date,setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(()=>setDate(new Date()), 1000 )
    return function cleanup() {
      clearInterval(timer)
    }

  });

  return(
      <div className="home-page__timer">
        <p className="home-page__timer__time"> {date.toLocaleTimeString()}</p>
        <p className="home-page__timer__date">{date.toLocaleDateString()}</p>
      </div>
  )
}

export default DateTime