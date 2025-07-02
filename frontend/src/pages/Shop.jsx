import React from 'react'
import { NewCollections } from '../components/NewCollections/NewCollections'
import { Popular } from '../components/Popular/Popular'
import { Offers } from '../components/Offers/Offers'
import { NewsLetter } from '../components/NewsLetter/NewsLetter'
import {LoginSignup } from './LoginSignup'
export const Shop = () => {
  return (
    <div>
   
      <Popular />
      <Offers />
  
      <NewCollections />
      <NewsLetter />
      <LoginSignup />
    </div>
  )
}
