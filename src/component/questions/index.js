import React from 'react'
import QuestionContainer from '../../container/question';
import data from './data'

const Question =(props)=> {


    const shuffle =(arra1, n)=> {
        let ctrl = arra1.length, temp, index;
        while (ctrl > 0) {
            index = Math.floor(Math.random() * ctrl)
            ctrl--;
    
            temp = arra1[ctrl]
            arra1[ctrl] = arra1[index]
            arra1[index] = temp;
        }
        return arra1.slice(0,n)
        
    }

    
    const questions = data
    const randomQuestions = shuffle(questions.questions,5)
    console.log(props);
    console.log(questions);
    console.log(randomQuestions);
    return(
        <div className="container">
            <h2>Questions</h2>
            <div>
                <QuestionContainer questions={randomQuestions} {...props}/>
            </div>
        </div>
    )
}

export default Question