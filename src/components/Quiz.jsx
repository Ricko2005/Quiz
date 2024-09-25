import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { data } from './data'; // Vérifiez que le chemin est correct selon votre structure de projet

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0); // État pour garder la trace du score
    const [quizCompleted, setQuizCompleted] = useState(false); // État pour vérifier si le quiz est terminé

    useEffect(() => {
        setQuestion(data[index]);
        setSelectedOption(null); // Réinitialiser la sélection pour chaque nouvelle question

        const handleKeyPress = (event) => {
            if (!quizCompleted) {
                switch (event.key) {
                    case 'a':
                        checkAns(event, 1);
                        break;
                    case 'b':
                        checkAns(event, 2);
                        break;
                    case 'c':
                        checkAns(event, 3);
                        break;
                    case 'd':
                        checkAns(event, 4);
                        break;
                    case 'Enter': // Gérer l'appui sur "Entrée" pour passer à la question suivante
                        handleNext();
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [index, quizCompleted]);

    const checkAns = (e, ans) => {
        if (selectedOption === null) {
            setSelectedOption(ans);
            // Mettre à jour le score si la réponse est correcte
            if (question.ans === ans) {
                setScore(prevScore => prevScore + 1);
                e.target.classList.add('correct');
            } else {
                e.target.classList.add('wrong');
            }
        }
    };

    const handleNext = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);
        } else {
            setQuizCompleted(true); // Marquer le quiz comme terminé
        }
    };

    const handleRestart = () => {
        setIndex(0);
        setScore(0);
        setQuizCompleted(false);
    };

    // Options avec lettres
    const options = [
        { letter: 'A', text: question.option1, ans: 1 },
        { letter: 'B', text: question.option2, ans: 2 },
        { letter: 'C', text: question.option3, ans: 3 },
        { letter: 'D', text: question.option4, ans: 4 }
    ];

    return (
        <div className='container'>
            <h1>Quiz React</h1>
            <hr />

            {quizCompleted ? (
                <div className="result">
                    <h2>Votre score : {score} sur {data.length}</h2>
                    {score >= data.length / 2 ? (
                        <p>Félicitations ! Vous avez réussi le quiz !</p>
                    ) : (
                        <p>Dommage ! Vous n'avez pas atteint la moitié des points. Essayez encore !</p>
                    )}
                    <button onClick={handleRestart}>Recommencer</button>
                </div>
            ) : (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option.ans}
                                className={selectedOption === option.ans ? (question.ans === option.ans ? 'correct' : 'wrong') : ''}
                                onClick={(e) => checkAns(e, option.ans)}
                            >
                                {option.letter}. {option.text}
                            </li>
                        ))}
                    </ul>

                    <button onClick={handleNext} disabled={selectedOption === null}>Suivant</button>
                    <div className="index">{index + 1} sur {data.length} questions</div>
                </>
            )}
        </div>
    );
};

export default Quiz;




