import React from 'react';

import classes from '../styles/Anaylysis.module.css';
import Questions from './Questions';


export default function Anaylysis({answers}) {
  return (
    <div className={classes.analysis}>
    <h1>Question Analysis</h1>
  

    <Questions answers={answers}/>


  </div>
  )
}