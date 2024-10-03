import React, { useEffect, useLayoutEffect, useState } from 'react';
import PostDetail from '../components/PostDetails/PostDetails';
import {NetworkWifi1Bar} from '@mui/icons-material';
import {NavLink} from 'react-router-dom';
import {getTips} from '../firebase';
import Loader from '../components/Loader/Loader';
import AppHelmet from '../components/AppHelmet';


export default function Tips({userData}) {
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState([]);
  const [days, setDays] = useState(null);
  const [currentDate, setCurrentDate] = useState(null)
  const [tipsPerPage] = useState(25);
  const [active, setActive] = useState(null)
  const [category, setCategory] = useState('premium')

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });
  const [isOnline] = useState(() =>{
    return navigator.onLine
  })

  
  useEffect(() =>{
    getTips(tipsPerPage, setTips, setLoading);
  }, [isOnline, tipsPerPage]);

  useEffect(() => {
    let dates = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    setDays(dates.reverse())
  }, []);

  useEffect(() => {
    days && setCurrentDate(days[days.length - 1])
  }, [days]);
  
  useEffect(() =>{
    if(tips.length > 0){
      setActive(tips.filter((tip) => (category==='free') ? (tip.premium === false) : (tip.premium === true))[0])
    }
  }, [tips]);

  useEffect(() => {
    loading && setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);
  
  const handleReload = () => {
    getTips(tipsPerPage, setTips, setLoading);
  }


  const returnDate = (date) => {
    const d = new Date(date);
    let day = d.getDay();
    let dateWeek = d.getDate()
    let dayWeek;
    switch(day){
      case 0:
        dayWeek = "Sunday";
      break;
      case 1:
        dayWeek = "Monday";
      break;
      case 2:
        dayWeek = "Tuesday";
      break;
      case 3:
        dayWeek = "Wednesday";
      break;
      case 4:
        dayWeek = "Thursday";
      break;
      case 5:
        dayWeek = "Friday";
      break;
      case 6:
        dayWeek = "Saturday";
      break;
      default:
        dayWeek = "Saturday";
    }
    return dateWeek + " " + dayWeek; 
  }
 

  const handleClick = (tip) => {
    setActive(tip);
    document.querySelector(".post-detail").classList.add("active")
  };

  const returnCurrentDate = (date) => {
    const d = new Date(date)
    let item = d.toLocaleString().split(',')[0]
    return item;
  }


  return (
    <div className="tips">
      <AppHelmet title={"Powerking Tips"} />
      <div className='container'>
      <div className="filter-wrapper">
        <p>September 2024</p>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="free" >Free</option>
            <option value="premium">Premium</option>
        </select>
      </div>
      <div className="filter">
          {
            days && days.map((day) => {
              return <button className={`btn-filter ${(currentDate === day) && 'active'}`} onClick={() => setCurrentDate(day)}>
                <span>{returnDate(day).split(" ")[1].substring(0, 3)}</span>
                <span>{returnDate(day).split(" ")[0]}</span>
              </button>
            })
          }
        </div>

      <table>
        <tr>
          <th>DATE</th>
          <th>HOME</th>
          <th>AWAY</th>
          <th>TIP</th>
          <th>ODDS</th>
        </tr>
        {
          (tips.length > 0) && tips.filter((tip) => (category==='free') ? (tip.premium === false) : (tip.premium === true)).filter(tip => tip.date === returnCurrentDate(currentDate)).map(tip => {
            return (<tr setActive={setActive} key={tip.id} onClick={() => handleClick(tip)} >
                      <td>
                        <span>{tip.date}</span>
                        <span>{tip.time}</span>
                      </td>
                      <td style={{
                           color: (tip.premium && (tip.status !== 'finished')) && 'transparent',
                           textShadow: (tip.premium && (tip.status !== 'finished')) && '0 0 5px rgba(0,0,0,.2)'}}>{tip.home}</td>
                      <td style={{
                           color: (tip.premium && (tip.status !== 'finished')) && 'transparent',
                           textShadow: (tip.premium && (tip.status !== 'finished')) && '0 0 5px rgba(0,0,0,0.2)'}}>{tip.away}</td>
                      <td>{tip.pick}</td>
                      <td>{tip.odd}</td>
                    </tr>)
          })
        }

      </table>
      <div className="wrapper">
          {
            (!isOnline && (tips.length === 0) && !loading) && <div className='no-network'>
              <h1>Nothing Yet!</h1>
              <p>This could be a network issue. Check you internet and try again.</p>
              <NetworkWifi1Bar className='wifi'/>
              <NavLink className="btn" onClick={handleReload}>Reload</NavLink>
            </div>
          }
                    
          {
            ((!tips.length > 0) && loading) && <Loader />
          }
      </div>
    </div>
  
    {
      active && <PostDetail data={active} userData={userData}/>
    }
    </div>
  )
}