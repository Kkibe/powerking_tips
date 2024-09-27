import React from 'react'
import './PostCard.scss';
import Profile from '../../assets/vip.jpg';
import { ErrorTwoTone, TimelapseOutlined, Verified } from '@mui/icons-material';

export default function PostCard({setActive, data}) {
  const myDate = new Date();
  const handleClick = () => {
    setActive(data);
    document.querySelector(".post-detail").classList.add("active")
  };

  function truncateLeague(input, value) {
    if (input.length > value) {
       return input.substring(0, value) + '...';
    }
    return input;
 };
  return (
  <div className="post-card" onClick={handleClick} style={{borderLeft: data.premium ? "5px solid #FFBD59" : "5px solid green"}}>
    <div className="center">
      <div className="teams">
        <div className="home">
          <p className="name">{truncateLeague(data.home , 15)}</p>
          <div className="image"><img src={data.homeImage} alt={data.home} /></div>
        </div>
        <div className="results">
          {data.results ? data.results : "Pen" }
        </div>
        <div className="away">
          <p className="name">{truncateLeague(data.away , 15)}</p>
          <div className="image"><img src={data.awayImage} alt={data.away} /></div>
        </div>
      </div>

      
      <div className='info'>
        <p><TimelapseOutlined className='icon'/>{data.time}</p>
        <h4>{data.premium ? 'view' : `💡${truncateLeague(data.pick, 20)}`}</h4>
        <p>
          {
            data.odd
          }
          {
            data.won ? <Verified className='icon won'/> :  <ErrorTwoTone className='icon lost'/>
          }
        </p>
      </div>
    </div>
  </div>
  )
}