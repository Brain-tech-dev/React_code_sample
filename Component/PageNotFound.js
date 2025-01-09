import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
   
   <div className="body404">
  <div className="container404">
    <div className="number404">404</div>
    <div className="error-page">
      <span>Ooops...</span>
      <br />Page not found
    </div>
    <Link className="mebtn btn blue-btn" to="/admin">Go Back</Link>
  </div>
</div>

  )
}
