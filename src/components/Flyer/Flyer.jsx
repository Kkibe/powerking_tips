import React, { useContext, useEffect, useRef, useState } from 'react'
import './Flyer.scss'
import { Link} from 'react-router-dom';
import { PriceContext } from '../../PriceContext';
import S3 from '../../assets/s1.mp4';
import PostCard from '../PostCard/PostCard';
import { getWonTips } from '../../firebase';

export default function Flyer() {
  const {setPrice} = useContext(PriceContext);
  const [tips, setTips] = useState(null);
  const [isOnline] = useState(() =>{
    return navigator.onLine
  })

  const videoRef= useRef();
  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.5;
  };




  useEffect(() =>{
    getWonTips(8,setTips);
  }, [isOnline]);


  return (
    <div className='flyer'>
          <video className='background' autoPlay loop muted ref={videoRef} onCanPlay={() => setPlayBack()}>
            <source src={S3} type="video/mp4" />
          </video>
          <h1 className='title'>Unlock exclusive VIP predictions—boost your winnings today!</h1>
          <h2 className='title'>Win big anywhere you are with Expert Football Predictions</h2>
          <Link to={'pay'} className='btn' onClick={() => setPrice(3000)}>Become A Member</Link>
          <div className="scroll">
            <div className="scroll-track">
            {
              tips && tips.filter((tip) =>(tip.won === 'won')).map((tip) => {
                return <PostCard active setActive key={tip.id} data={tip}/>
              })
            }
            </div>
          </div>
    </div>
  )
}
