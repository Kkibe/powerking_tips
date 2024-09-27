import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { getNews, getTips } from '../firebase';
import AppHelmet from '../components/AppHelmet';
import AppHead from '../components/AppHead/AppHead';
import Flyer from '../components/Flyer/Flyer';
import PostCard from '../components/PostCard/PostCard';
import Loader from '../components/Loader/Loader';
import Slider from '../components/Slider/Slider';
import { Link, NavLink } from 'react-router-dom';
import Testimonials from '../components/Testimonials/Testimonials';
import { PriceContext } from '../PriceContext';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState([]);
  const [dates, setDates] = useState([]);
  const [newsPerPage] = useState(8);
  const {setPrice} = useContext(PriceContext);

  useEffect(() => {
    getNews(8, "all", setNews, setLoading);
  }, [])
  
  const [isOnline] = useState(() =>{
    return navigator.onLine
  })
  
  useEffect(() =>{
    getNews(6, "all", setNews, setLoading);
  }, [isOnline]);

  const handleDates = () =>{
    const myDate = [];
    for(let i = 0; i <= myDate.length; i++){
      if(dates.includes(tips[i].date)){
        return
      } else {
        dates.push(tips[i].date)
      }
    }
    setDates(myDate)
  }
  useEffect(() =>{
    getTips(6,  /*new Date().toLocalString()*/ '13th June 2023',setTips, setLoading);
    tips.length > 0 && handleDates()
  }, [isOnline, newsPerPage]);
  
  useEffect(() =>{
    tips.length > 0 && handleDates()
  }, [tips]);

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
      <AppHelmet title={"Powerking Tips"}/>
      <Flyer tips={tips}/>
      <h1>Pricing</h1>
      <AppHead />
      {
          news.length && <h1>Free Tips</h1>
      }
      <div className="wrapper">
        {
          tips.length > 0 && tips.filter((tip) => tip.premium === false).map((tip) => {
            return <PostCard active setActive key={tip.id} data={tip}/>
          })
        }
        {
            ((!tips.length > 0) && loading) && <Loader />
        }
        <NavLink to={"/tips"}>more tips &raquo;</NavLink>
      </div>
      {
          news.length && <><h1>Sports News</h1><h2>Trending Articles</h2></> 
      }
      {news.length && <Slider data={news}/>}
      <div className="jobs-flyer" style={{width: '100%', padding: '5px'}}>
          <h1>Oh! You have digged our website and would like to win big?</h1>
          <h1>Get VIP memmbership for 1 month with as little as KSH 1500.</h1>
          <Link to={'pay'} className='btn' onClick={() => setPrice(1500)}>Subscribe Now</Link>
      </div>
      
      <h1>Testimonials</h1>
      <h2>What clients says:</h2>
      <Testimonials />
    </div>
  )
}
