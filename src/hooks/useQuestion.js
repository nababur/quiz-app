import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';



export default function useQuestion(videoID) {
  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] =  useState([]);


    useEffect(() => {

        async function fetchQuestions(){
            // Databaes related works
            const db = getDatabase();
            const quizRef = ref(db, "quiz/" + videoID + '/questions');
            const quizQuery = query(
                quizRef,
                orderByKey()
              
                
                );


            try {
                setError(false);
                setLoading(true);
                // Request firebase database

                const snapshot =  await get(quizQuery);
                setLoading(false);

                if (snapshot.exists()) {
                    setQuestions((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(snapshot.val())]
                    });
                }

            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }

        }

        setTimeout(() => {

            fetchQuestions();
            
        }, 2000);



    }, [videoID]);


    return{
        loading,
        error,
        questions
    }
    

}
