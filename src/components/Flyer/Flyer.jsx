import React, { useContext, useRef } from 'react'
import './Flyer.scss'
import { Link} from 'react-router-dom';
import { PriceContext } from '../../PriceContext';
import S3 from '../../assets/s1.mp4';
import PostCard from '../PostCard/PostCard';

export default function Flyer({tips}) {
  const {setPrice} = useContext(PriceContext);
  const videoRef= useRef();
  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.5;
  };

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
              tips.length > 0 && tips.filter((tip) =>(tip.won === 'won')).map((tip) => {
                return <PostCard active setActive key={tip.id} data={tip}/>
              })
            }
            </div>
          </div>
    </div>
  )
}
