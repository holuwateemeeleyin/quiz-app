import React, { Component } from 'react'


class QuestionContainer extends Component {
    state = {
        quesIndex:0,
        optionClick:null,
        response:{},
        existingAnswer:null,
        numberOfQuestions:5,
        numberClick: ''
    }

    componentDidMount(){
        const answer = this.getExistingAnswer()
        console.log(answer)
        this.setState({existingAnswer:answer})
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.quesIndex !== this.state.quesIndex){
            const answer = this.getExistingAnswer()
            this.setState({existingAnswer:answer})
           
        }
    }

    persistLocalStorage = (cb) =>{

        const {quesIndex,response,optionClick} = this.state
        const setLocalStorage = (data) =>{
            const stringData = JSON.stringify(data)
            localStorage.setItem('submission', stringData)
        }

        const goToNextQuestion = () => {
            cb()
        }

        if(!response.question_id) return goToNextQuestion()

        //GET EXISTING DATA FROM LOCAL STORAGE
        const data = localStorage.getItem('submission')

        if(data){

            //PARSE DATA
            const parsedData = JSON.parse(data)

            const exist = parsedData.filter(item =>{
                return item.question_id === this.props.questions[quesIndex]._id
            })
            
            if(exist.length > 0) return parsedData.forEach(item =>{
                if(item.question_id === this.props.questions[quesIndex]._id){
                    if(optionClick !== "") item.answer = optionClick 
                    setLocalStorage(parsedData)
                    return goToNextQuestion()
                }
            })

            //CONCATENATE DATA 
            parsedData.push(response)
            setLocalStorage(parsedData)
            return goToNextQuestion()
        }
        
        const responseData = [this.state.response]
        setLocalStorage(responseData)
        goToNextQuestion()
    }

    changeOption = (event, question)=> {
        console.log(event.target.value);
        this.setState({existingAnswer:null, optionClick: parseInt(event.target.value), response:{
            question_id:question,
            answer:parseInt(event.target.value)
        }})
        // this.setState({optionClick:event.target.value})
    }
    handleNextClick=()=>{
        const cb = ()=>this.setState({quesIndex:this.state.quesIndex + 1, optionClick:"", response:{}})
        this.persistLocalStorage(cb)
    }
    handlePreviousClick=()=>{
        const cb = ()=> this.setState({quesIndex:this.state.quesIndex - 1, optionClick:"", response:{}})
        this.persistLocalStorage(cb)
    }
    getExistingAnswer = () =>{
        const data = localStorage.getItem('submission')
        if(!data) return null
        const parsedData = JSON.parse(data)

        //FOR THE QUESTION WE ARE CURRENTLY ON, GET IT'S QUESTION AND ANSWER FROM THE LOCALSTORAGE
        const response = parsedData.filter(item =>{
            
            return item.question_id === this.props.questions[this.state.quesIndex]._id
        })
        
        if(response.length > 0 ){
            // console.log(response[0].answer)
            // this.setState({existingAnswer:response[0].answer})
            return response[0].answer
        }
        return null
    }
    handleNumbersIdClick=()=> {
        this.setState ({numberClick:this.props.questions[this.state.quesIndex]})
    }

 
    QuestionNumbers = () => {
        return <div>{[...Array(this.state.numberOfQuestions)].map((e, i) => {
          return <button key={i}>{i+1}</button>
        })}</div>
      }


      handleQuitButtonClick = () => {
        if(window.confirm('Are you sure you want to submit')){
            this.endExam()
        }
    }

    endExam = (props) => {
        alert ('quiz has ended');
        
        setTimeout(() => {
            this.props.history.push('/testscore');
        }, 1000)
    }

    render(){
        console.log(this.props);
        const questions = this.props.questions
        const currentQuestion = questions[this.state.quesIndex]
        // console.log(currentQuestion);
        return (
            <div className="questions">
                <h3> {currentQuestion.question} </h3>
                <div>
                    {
                        currentQuestion.options.map((option, i)=>(
                            <div key={i} className="options">
                                <input
                                    type="radio"
                                    name={`option-${this.state.quesIndex}`}
                                    onChange={e => this.changeOption(e,currentQuestion._id,option)}
                                    value={i + 1}
                                    checked={
                                        this.state.existingAnswer
                                        ? this.state.existingAnswer === i + 1
                                        : this.state.optionClick === i + 1
                                    }
                                />{option}
                            </div>
                        ))
                    }
                </div>
                <div className="button_container">
                    <button disabled={!this.state.quesIndex} onClick={this.handlePreviousClick} >Previous</button>
                    
                    <button disabled={this.state.quesIndex + 1 >= this.props.questions.length} onClick={this.handleNextClick}>Next</button>
                    <button onClick={this.handleQuitButtonClick} >Submit</button>
                </div>
                <div className="numbers">
                        {this.QuestionNumbers()}
                </div>

            </div>
        )
    }
}
export default QuestionContainer