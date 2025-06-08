import React from 'react'
import disney from '../assets/images/disney.png'
import pixar from '../assets/images/pixar.png'
import marvel from '../assets/images/marvel.png'
import starwar from '../assets/images/starwar.png'
import national from '../assets/images/nationalG.png'

import disneyVideo from '../assets/Videos/disney.mp4'
import pixarVideo from '../assets/Videos/pixar.mp4'
import marvelVideo from '../assets/Videos/marvel.mp4'
import starwarVideo from '../assets/Videos/star-wars.mp4'
import nationalVideo from '../assets/Videos/national-geographic.mp4'



function ProductionHouse() {
    const ProductionHouseList= [
        { id: 1,
          image : disney,
          video : disneyVideo
        },
        { id: 2,
          image : pixar,
          video : pixarVideo
        },
        { id: 3,
          image : marvel,
          video : marvelVideo
        },
        { id: 4,
          image : starwar,
          video : starwarVideo
        },
        { id: 5,
          image : national,
          video : nationalVideo
        }
    ]
  return (
<div className='flex gap-2 md:gap-5 px-5 md:px-16'>
  {ProductionHouseList.map((item) => (
    <div
      key={item.id}
      className='relative w-full border-2 border-zinc-600 rounded-xl cursor-pointer shadow-xl shadow-zinc-800
                 hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden'
    >
      <video
        src={item.video}
        autoPlay
        loop
        muted
        playsInline
        className='absolute top-0 left-0 w-full h-full rounded-xl opacity-0 hover:opacity-50 transition-opacity duration-300'
      />
      <img
        src={item.image}
        alt={item.name}
        className='w-full h-auto rounded-xl block'
      />
    </div>
  ))}
</div>

  )
}

export default ProductionHouse