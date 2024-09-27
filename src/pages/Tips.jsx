import React, { useEffect, useLayoutEffect, useState } from 'react';
import PostCard from '../components/PostCard/PostCard';
import PostDetail from '../components/PostDetails/PostDetails';
import { NetworkWifi1Bar} from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';
import { getTips } from '../firebase';
import Loader from '../components/Loader/Loader';
import AppHelmet from '../components/AppHelmet';



export default function Tips({userData}) {
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState([]);
  const dates = [];
  const [newsPerPage] = useState(8);
  const [active, setActive] = useState(null)
  const [category, setCategory] = useState('free')
  let location = useLocation();


  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });
  const [isOnline] = useState(() =>{
    return navigator.onLine
  })
  
  useEffect(() =>{
  
    getTips(newsPerPage,'08/09/2024',setTips, setLoading);
    if(tips.length > 0){
      setActive(tips[0])
    }
    
  }, [isOnline, newsPerPage, location]);
  
  useEffect(() =>{
    if(tips.length > 0){
      setActive(tips[0])
    }
  }, [tips]);

  useEffect(() => {
    loading && setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);
  
  const handleReload = () => {
    getTips(newsPerPage, '08/09/2024',setTips, setLoading);
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

  const handleSetActive = (e) => {
    const buttons = document.querySelectorAll('.btn-filter')

    buttons.forEach(btn => {
      btn.classList.remove('active')
    })
    e.target.classList.add('active')
  }
  

  useEffect(() => {
  if(tips.length > 0){
    tips.forEach(tip => {
      if(!dates.indexOf(tip.date)){
        dates.push(tip.date)
      }
    }
  )}
  }, [tips])
 
  return (
    <div className="tips">
      <AppHelmet title={"Powerking Tips"} />
      <div className='container'>
      <p>September 2024</p>
      <div className="filter-wrapper">
        <div className="sort">
          <p>Sort</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="free" >Free</option>
              <option value="premium">Premium</option>
            </select>
        </div>
        <div className="filter">
          {
            tips.length > 0 && tips.map((item) => {
              return  <>
              <button className="btn-filter" onClick={handleSetActive}>{returnDate(item.date)}</button>
              </>
            })
          }
        </div>
      </div>

      <div className="wrapper">
          {
            tips.length && tips.filter((tip) => (category==='free') ? (tip.premium === false) : (tip.premium === true)).map(tip => {
              return <PostCard setActive={setActive} key={tip.id} data={tip}/>
            })
          }
          
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