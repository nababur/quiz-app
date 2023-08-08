import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';



export default function useQuestion(videoID) {
  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] =  useState([]);


    useEffect(() => {

        async function fetchAnswers(){
            // Databaes related works
            const db = getDatabase();
            const answerRef = ref(db, "answers/" + videoID + '/questions');
            const answerQuery = query(answerRef,orderByKey());


            try {
                setError(false);
                setLoading(true);
                // Request firebase database

                const snapshot =  await get(answerQuery);
                setLoading(false);

                if (snapshot.exists()) {
                    setAnswers((prevAnswers) => {
                        return [...prevAnswers, ...Object.values(snapshot.val())]
                    });
                }

            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }

        }

        setTimeout(() => {

            fetchAnswers();
            
        }, 2000);



    }, [videoID]);


    return{
        loading,
        error,
        answers
    }
    

}
