import React from 'react'
import { Hero } from './Pages/Hero'
import { Routes, Route} from 'react-router-dom'
import Main from './Pages/Main'
import AnimationList from './Components/AnimationList'
import AnimationCategory from './Pages/AnimationCategory'
import AnimationDetail from './Pages/AnimationDetails'
import BlogPost from './Pages/BlogPost'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero/>}></Route>
        <Route path="/animation" element={<AnimationCategory/>}></Route>
        <Route path="/animation/:id" element={<AnimationDetail/>}></Route>
        <Route path="/blog/:animationId" element={<BlogPost/>}></Route>
       
      </Routes>
      
    </div>
  )
}

export default App
