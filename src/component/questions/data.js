const data = {


    questions: [
        {
            _id: 1,
            question: "What does CSS stand for?",
            options: [
                "Computer Style Sheets",
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Colorful Style Sheets",
            ],
            answer: "Cascading Style Sheets"            
        },
        {
            _id: 2,
            question: "Where in an HTML document is the correct place to refer to an external style sheet?",
            options:[
                "In the <head> section",
                "In the <body> section",
                "At the end of the document",
                "You can't refer to an external style sheet"
            ],
            answer: "In the <head> section"
        },
        {
            _id: 3,
            question: "Which HTML tag is used to define an internal style sheet?",
            options:[
                "<style>",
                "<script>",
                "<headStyle>", 
                "<css>",
            ],
            answer: "<style>"
        },
        {
            _id: 4,
            question: "Which HTML attribute is used to define inline styles?",
            options:[
                "class",
                "style",
                "font",
                "styles",
            ],
            answer: "style"
        },
        {
            _id: 5,
            question: "Which is the correct CSS syntax?",
            options: [
                "{body:color=black;}", 
                "{body;color:black;}",
                "body:color=black;",
                "body {color: black;}",
            ],
            answer: "body {color: black;}"
        },

    ]

}

export default data;