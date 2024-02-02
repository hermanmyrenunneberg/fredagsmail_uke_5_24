const questions = [
    {
        text: "Foretrekker du en intim eller livlig atmosfære?",
        options: ["Intim", "Livlig"],
        attribute: "atmosphere",
    },
    {
        text: "Er du interessert i å møte mennesker fra en bestemt aldersgruppe?",
        options: ["Yngre", "Blandet", "Eldre"],
        attribute: "ageGroup",
    },
    {
        text: "Hvilken type musikk foretrekker du?",
        options: ["Popmusikk", "Techno", "HipHop/RnB/Afrobeats", "Variert/Uspesifisert"],
        attribute: "music",
    },
    {
        text: "Er det viktig for deg å kunne danse?",
        options: ["Ja", "Nei"],
        attribute: "dance",
    },
    {
        text: "Foretrekker du et sted hvor du kan prate uten å måtte rope?",
        options: ["Ja", "Nei"],
        attribute: "conversation",
    },
    {
        text: "Er du åpen for å besøke skeive utesteder?",
        options: ["Ja", "Nei"],
        attribute: "inclusive",
    },
    {
        text: "Setter du pris på et sted med unik tematikk eller konsept?",
        options: ["Ja", "Nei"],
        attribute: "uniqueConcept",
    }
];

let currentQuestionIndex = 0;
const results = {};

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = ""; // Clears previous question

    const question = questions[currentQuestionIndex];
    const questionEl = document.createElement('div');
    questionEl.innerHTML = `<p>${question.text}</p>`;

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectOption(question.attribute, option);
        questionEl.appendChild(button);
    });

    questionContainer.appendChild(questionEl);
}


function selectOption(attribute, option) {
    results[attribute] = option;
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        displayResults();
    }
}

function displayResults() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `<p>Takk for at du deltok! Basert på dine svar, anbefaler vi følgende utesteder(obs: I fjor gikk Elsker ut mot «heterosafari», hvor folk har det gøy på skeives bekostning. Vis respekt – som på alle andre steder!):</p>`;
    const venues = [
        { name: "Justisen", atmosphere: "Livlig", ageGroup: "Blandet", music: "Variert/Uspesifisert", dance: "Nei", conversation: "Ja", inclusive: "Ja", uniqueConcept: "Nei" },
        { name: "BA3", atmosphere: "Livlig", ageGroup: "Blandet", music: "Variert/Uspesifisert", dance: "Ja", conversation: "Nei", inclusive: "Ja", uniqueConcept: "Nei" },
        { name: "Kulturhuset", atmosphere: "Livlig", ageGroup: "Yngre", music: "Variert/Uspesifisert", dance: "Ja", conversation: "Nei", inclusive: "Ja", uniqueConcept: "Nei" },
        { name: "Jaeger", atmosphere: "Livlig", ageGroup: "Yngre", music: "Techno", dance: "Ja", conversation: "Nei", inclusive: "Ja", uniqueConcept: "Nei" },
        { name: "Elsker", atmosphere: "Livlig", ageGroup: "Blandet", music: "Popmusikk", dance: "Ja", conversation: "Ja", inclusive: "Ja", uniqueConcept: "Ja" },
        { name: "Hysj", atmosphere: "Livlig", ageGroup: "Blandet", music: "HipHop/RnB/Afrobeats", dance: "Ja", conversation: "Nei", inclusive: "Ja", uniqueConcept: "Ja" },
        { name: "Becco", atmosphere: "Intim", ageGroup: "Blandet", music: "Variert/Uspesifisert", dance: "Nei", conversation: "Ja", inclusive: "Ja", uniqueConcept: "Nei" },
        { name: "Territoriet", atmosphere: "Intim", ageGroup: "Blandet", music: "Variert/Uspesifisert", dance: "Nei", conversation: "Ja", inclusive: "Ja", uniqueConcept: "Nei" },
        { name: "Parkteatret", atmosphere: "Livlig", ageGroup: "Blandet", music: "Variert/Uspesifisert", dance: "Ja", conversation: "Ja", inclusive: "Ja", uniqueConcept: "Nei" },
        { name: "Albatross", atmosphere: "Intim", ageGroup: "Blandet", music: "Variert/Uspesifisert", dance: "Nei", conversation: "Ja", inclusive: "Ja", uniqueConcept: "Nei" },
        { name: "F6", atmosphere: "Intim", ageGroup: "Blandet", music: "Variert/Uspesifisert", dance: "Nei", conversation: "Ja", inclusive: "Ja", uniqueConcept: "Nei" },
        { name: "Bar Lardo", atmosphere: "Intim", ageGroup: "Blandet", music: "Variert/Uspesifisert", dance: "Nei", conversation: "Ja", inclusive: "Ja", uniqueConcept: "Nei" },
        { name: "Roleur", atmosphere: "Intim", ageGroup: "Blandet", music: "Variert/Uspesifisert", dance: "Nei", conversation: "Ja", inclusive: "Ja", uniqueConcept: "Nei" }
        // Fortsett med resten av utestedene
    ];
    
    //const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `<p>Takk for at du deltok! Basert på dine svar, anbefaler jeg følgende utesteder:</p><p>obs: I fjor gikk Elsker ut mot «heterosafari», hvor folk har det gøy på skeives bekostning. Vis respekt – som på alle andre steder!</p>`;


    // Score each venue based on the number of matches with the user's results
    venues.forEach(venue => {
        let score = 0;
        for (const key in results) {
            if (results[key] === venue[key] || venue[key] === "Variert/Uspesifisert") {
                score++;
            }
        }
        venue.score = score; // Add score to the venue object
    });

    // Sort venues by score in descending order
    venues.sort((a, b) => b.score - a.score);

    // Filter in venues that have a score greater than 0
    const recommendedVenues = venues.filter(venue => venue.score > 0);

    if (recommendedVenues.length === 0) {
        questionContainer.innerHTML += `<p>Beklager, jeg kunne ikke finne et perfekt match for dine preferanser. Prøv igjen!</p>`;
    } else {
        const list = document.createElement('ul');
        recommendedVenues.forEach(venue => {
            const item = document.createElement('li');
            item.textContent = `${venue.name} (Score: ${venue.score})`; // Display the venue name with its score
            list.appendChild(item);
        });
        questionContainer.appendChild(list);
    }
}

// Initialize the questionnaire
displayQuestion();
