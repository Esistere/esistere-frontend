import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

function CreaQuizAllenamento(): JSX.Element {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [questionData, setQuestionData] = useState<QuizQuestion[]>([]);

  const handleNumberOfQuestionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newNumberOfQuestions = Number(event.target.value);

    setNumberOfQuestions(newNumberOfQuestions);

    if (newNumberOfQuestions > questionData.length) {
      // Aggiungi nuove domande se il nuovo numero è maggiore
      const additionalQuestions = newNumberOfQuestions - questionData.length;
      const newQuestions = Array.from({ length: additionalQuestions }, () => ({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      }));
      setQuestionData([...questionData, ...newQuestions]);
    } else if (newNumberOfQuestions < questionData.length) {
      // Rimuovi domande se il nuovo numero è minore
      const remainingQuestions = questionData.slice(0, newNumberOfQuestions);
      setQuestionData(remainingQuestions);
    }
  };

  const handleQuestionChange = (
    questionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newQuestionData = [...questionData];
    newQuestionData[questionIndex].question = event.target.value;
    setQuestionData(newQuestionData);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newQuestionData = [...questionData];
    newQuestionData[questionIndex].options[optionIndex] = event.target.value;
    setQuestionData(newQuestionData);
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newQuestionData = [...questionData];
    newQuestionData[questionIndex].correctAnswer = event.target.value;
    setQuestionData(newQuestionData);
  };

  const handleAddQuestion = (): void => {
    const newQuestion: QuizQuestion = {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    };

    setQuestionData([...questionData, newQuestion]);
  };

  const handleQuizCreation = (): void => {
    // Implement logic for handling the quiz creation
    console.log(questionData);
  };

  return (
    <div>
      <Typography variant="h4">Quiz Creation Page</Typography>
      <TextField
        label="Number of Questions"
        type="number"
        value={numberOfQuestions}
        onChange={handleNumberOfQuestionsChange}
      />

      <Grid container spacing={2}>
        {questionData.map((question, questionIndex) => (
          <Grid item xs={12} key={questionIndex}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6">Question {questionIndex + 1}</Typography>
              <TextField
                label="Question"
                fullWidth
                value={question.question}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleQuestionChange(questionIndex, event)
                }
              />

              <FormControl component="fieldset">
                <RadioGroup
                  value={question.correctAnswer}
                  onChange={(event) =>
                    handleCorrectAnswerChange(questionIndex, event)
                  }
                >
                  {question.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={option}
                      control={<Radio />}
                      label={
                        <TextField
                          label={`Option ${optionIndex + 1}`}
                          fullWidth
                          value={option}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) =>
                            handleOptionChange(
                              questionIndex,
                              optionIndex,
                              event
                            )
                          }
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" onClick={handleAddQuestion}>
        Add Question
      </Button>

      <Button variant="contained" color="primary" onClick={handleQuizCreation}>
        Create Quiz
      </Button>
    </div>
  );
}

export default CreaQuizAllenamento;
