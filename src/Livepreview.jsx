
import React from 'react'
import { useParams } from 'react-router-dom'
import DynamicComponentRenderer from './Components/DynamicComponentRender'

const Livepreview = () => {
    const {id}=useParams()
  return (
    <div className="min-h-screen   w-full ">
        <div className='h-full w-full'>
            <DynamicComponentRenderer
                  componentKey={id}
                />

        </div>
                
              </div>
  )
}

export default Livepreview