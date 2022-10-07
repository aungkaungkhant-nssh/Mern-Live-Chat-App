import React from 'react'
import Navbar from '../components/Navbar'
import { AuthState } from '../context/AuthProvider';
function Chat() {
  const user= AuthState();
  return (
    <>
      {user && <Navbar />}
    </>
  )
}

export default Chat