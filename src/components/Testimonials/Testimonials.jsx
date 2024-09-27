import React from 'react'
import './Testimonials.scss'
import { testimonials } from '../../data'

export default function Testimonials() {
  return (
    <div className='testimonials'>
        {
            testimonials.map(testimonial => {
                return  <div className="testimonial" key={testimonials.indexOf(testimonial)}>
                <h4>"{testimonial.text}"</h4>
                <div className="user">
                    <div className="name">- {testimonial.name}</div>
                    <div className="country">{testimonial.country}</div>
                </div>
            </div>
            })
        }
    </div>
  )
}
