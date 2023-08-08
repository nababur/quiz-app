import _ from 'lodash';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAnswers from '../../hooks/useAnswers';
import Anaylysis from '../Anaylysis';
import Summary from '../Summary';



export default function Result() {

 const {id} = useParams();

 const navigate = useNavigate();
 const {state} = useLocation();
 const {qna} = state;


  const {loading, error, answers} = useAnswers(id);


  // console.log(answers);

  function calculate(){

    let score = 0;

    answers.forEach((question, index1) => {
      let correctIndexes = [],
      checkIndexes = [];


      question.options.forEach((option, index2) =>{
        if(option.correct) correctIndexes.push(index2);
        if (qna[index1].options[index2].checked) {
          checkIndexes.push(index2);

          option.checked = true;
        }
      });


      if (_.isEqual(correctIndexes, checkIndexes)) {
        score = score + 5;
      }


    });

    return score;

  }


  const userScore = calculate();

  return (
    <>

        {loading && <div>Loading...</div>}
        {error && <div>There was an Error!</div>}
        {answers && answers.length > 0 &&(
          <>
              <Summary score={userScore} noq={answers.length}/>
              <Anaylysis answers={answers}/>
          
          </>
        )}
     
    
    </>
  )
}
