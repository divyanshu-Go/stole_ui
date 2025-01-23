import { doLogout } from '@/app/actions'
import React from 'react'

const Logout = () => {
  return (
    <div>
       <form action={doLogout}> 
        <button className="bg-red-400 rounded" type="submit">Logout</button>
       </form>
    </div>
  )
}

export default Logout
