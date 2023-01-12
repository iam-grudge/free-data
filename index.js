const questions = [
    {
        question: "ഒരു ആഴ്ചയിൽ എത്ര ദിവസങ്ങൾ ഉണ്ട്?",
        optionA: "10 ",
        optionB: "14 ",
        optionC: "5 ",
        optionD: "7",
        correctOption: "optionD"
    },

    {
        question: "ഫുട്ബോൾ മത്സരത്തിൽ ഒരു ടീമിലെ എത്ര പേർക് കളിക്കാം?", 
        optionA: "10",
        optionB: "11",
        optionC: "9 ",
        optionD: "12",
        correctOption: "optionB"
    },

    {
        question: "ഇന്ത്യയുടെ ആദ്യ പ്രധാനമന്ത്രി?",
        optionA: "ഉമ്മൻ ചാണ്ടി",
        optionB: "പിണറായി വിജയൻ",
        optionC: "വജ്പെയി",
        optionD: "നെഹ്‌റു",
        correctOption: "optionD"
    },

    {
        question: "ഏതു മാസത്തിലാണ് 30 ദിവസം ഉള്ളത്?",
        optionA: "ഫെബ്രുവരി",
        optionB: "ജനുവരി",
        optionC: "ഏപ്രിൽ",
        optionD: "ഡിസംബർ",
        correctOption: "optionC"
    },

    {
        question: "ഒരു ദിവസം എത്ര മണിക്കൂർ ഉണ്ട്?",
        optionA: "30",
        optionB: "38",
        optionC: "48",
        optionD: "24",
        correctOption: "optionD"
    },

    {
        question: "ചതുരത്തിന് എത്ര വശം ഉണ്ട്?",
        optionA: "4",
        optionB: "8",
        optionC: "6",
        optionD: "5",
        correctOption: "optionA"
    },

    {
        question: "_ഏറ്റവും വലിയ വൻകര ഏത്? ?",
        optionA: "അമേരിക്ക",
        optionB: "ആഫ്രിക്ക",
        optionC: "ഏഷ്യ",
        optionD: "അന്റാർട്ടിക്ക",
        correctOption: "optionC"
    },

    {
        question: "ലോകത്തിലെ ഏറ്റവും വലിയ രാജ്യം ഏത്?",
        optionA: "റഷ്യ",
        optionB: "ഈജിപ്റ്റ്",
        optionC: "നേപ്പാൾ",
        optionD: "പാകിസ്ഥാൻ",
        correctOption: "optionA"
    },

    {
        question: "ഇവയിൽ ഒറ്റസംഖ്യ ഏത്?",
        optionA: "10",
        optionB: "12",
        optionC: "8",
        optionD: "11",
        correctOption: "optionD"
    },

    {
        question: "ഇവയിൽ ഏറ്റവും വലുത് ഏത്?",
        optionA: "കുതിര",
        optionB: "പൂച്ച",
        optionC: "സിംഹം",
        optionD: "ആന",
        correctOption: "optionD"
    },

   


    {
        question: "എന്നാണ് സ്വാതന്ത്ര്യദിനം",
        optionA: "ഓഗസ്റ്റ് 15",
        optionB: "നവംബർ 14",
        optionC: "സെപ്റ്റംബർ 1",
        optionD: "സെപ്റ്റംബർ 2",
        correctOption: "optionA"
    },


]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 6) {
        remark = "ഒന്നുകൂടി ശ്രമിച്ചോളൂ..."
        remarkColor = "red"
    }else if (playerScore >= 7)
     {
        remark = "വിജയിച്ചിരിക്കുന്നു."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}