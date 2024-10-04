import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { getNews, getTips } from '../firebase';
import AppHelmet from '../components/AppHelmet';
import AppHead from '../components/AppHead/AppHead';
import Flyer from '../components/Flyer/Flyer';
import Slider from '../components/Slider/Slider';
import { Link} from 'react-router-dom';
import Testimonials from '../components/Testimonials/Testimonials';
import { PriceContext } from '../PriceContext';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState(null);
  const {setPrice} = useContext(PriceContext);

  function formatDate() {
    const date = new Date();
    return date.toLocaleDateString('en-US');
  }

  useEffect(() => {
    getNews(8, "all", setNews, setLoading);
  }, [])
  
  const [isOnline] = useState(() =>{
    return navigator.onLine
  })
  
  useEffect(() =>{
    getNews(6, "all", setNews, setLoading);
  }, [isOnline]);

  useEffect(() =>{
    getTips(20,setTips, setLoading, formatDate());
  }, [isOnline]);

  useEffect(() => {
    loading && setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });
  
  return (
    <div className='Home'>
      <AppHelmet title={"Home"} location={''}/>
      <Flyer tips={tips}/>
      <h1>Pricing</h1>
      <AppHead />
      {
        tips && <h1>Free Tips</h1>
      }

      {
        tips &&(
        <table className='wrapper'>
          <tr>
            <th>DATE</th>
            <th>HOME</th>
            <th>AWAY</th>
            <th>TIP</th>
            <th>ODDS</th>
          </tr>

          {
             tips.filter((tip) => (tip.premium === false)).map(tip => {
              return (<tr key={tips.indexOf(tip)}>
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
  
        </table>)
      }

      {
          news.length && <><h1>Sports News</h1><h2>Trending Articles</h2></> 
      }
      {news.length && <Slider data={news}/>}
      <div className="jobs-flyer" style={{width: '100%', padding: '5px'}}>
          <h1>Oh! You have digged our website and would like to win big?</h1>
          <h1>Get VIP memmbership for 1 month with as little as KSH 3000.</h1>
          <Link to={'pay'} className='btn' onClick={() => setPrice(3000)}>Subscribe Now</Link>
      </div>
      
      <h1>Testimonials</h1>
      <h2>What clients says:</h2>
      <Testimonials />
    </div>
  )
}
