import React from 'react';

import { GlowEffect } from './glow-effect';
import { ArrowRight } from 'lucide-react';

export function GlowEffectButton({name}) {
  return (
    <div className='relative'>
      <GlowEffect
        colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
        mode='colorShift'
        blur='soft'
        duration={3}
        scale={0.9}
      />
      <button className='relative cursor-pointer inline-flex float-animation items-center gap-1 rounded-md bg-zinc-950 px-3 py-2  text-zinc-50 outline outline-1 outline-[#fff2f21f]'>
        <h1 className='  text-lg md:text-xl lg:text-2xl'>{name}</h1> <ArrowRight className='h-4 w-5 rainbow-text' />
      </button>
    </div>
  );
} 