package org.jaros.onlinesurveybackend.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.jaros.onlinesurveybackend.dto.NewAnswerDTO;
import org.jaros.onlinesurveybackend.dto.NewQuestionDTO;
import org.jaros.onlinesurveybackend.dto.NewSurveyDTO;
import org.jaros.onlinesurveybackend.model.Answer;
import org.jaros.onlinesurveybackend.model.Question;
import org.jaros.onlinesurveybackend.model.Survey;
import org.jaros.onlinesurveybackend.repository.AnswerRepository;
import org.jaros.onlinesurveybackend.repository.QuestionRepository;
import org.jaros.onlinesurveybackend.repository.SurveyRepository;
import org.jaros.onlinesurveybackend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    public SurveyService(SurveyRepository surveyRepository, AnswerRepository answerRepository, QuestionRepository questionRepository) {
        this.surveyRepository = surveyRepository;
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }

    public ResponseEntity<?> getSurveyDetails(int id) {

        List<Survey> surveyList = surveyRepository.findByUserId(id);

        return ResponseEntity.ok(surveyList);
    }

    public ResponseEntity<?> getSurvey(int id) {

        Optional<Survey> surveyList = surveyRepository.findById(id);
        Survey survey = surveyList.get();
        survey.setUserId(0);
        for(Question question : survey.getQuestions()) {
            if(question.getType().equals("open")) {
                Answer answer = new Answer( question, "", 0);
                question.setAnswers(List.of(answer));

            }else{
                for(Answer answer : question.getAnswers()) {
                    answer.setChosenCount(0);
                }
            }

        }

        return ResponseEntity.ok(survey);
    }

    public ResponseEntity<?> getSurveyAnswer(Survey survey) {




//        System.out.println(survey.toJson());

        for(Question question : survey.getQuestions()) {

            if(Objects.equals(question.getType(), "open") && !question.getAnswers().getFirst().getAnswerName().equals("")) {

                Question questionFromDB = questionRepository.findById(question.getId()).orElse(null);


                Answer newAnswer = new Answer(questionFromDB, question.getAnswers().getFirst().getAnswerName());
//                System.out.println("otwarte" + question.getAnswers().getFirst().getAnswerName());
                answerRepository.save(newAnswer);

                questionRepository.findById(question.getId()).get();
                surveyRepository.findById(survey.getId()).get();


            }else{
                for(Integer chosenAnswers : question.getChosenAnswers()) {

                    answerRepository.findById(chosenAnswers)
                            .map(existAnswer ->
                            {
                                existAnswer.setChosenCount(existAnswer.getChosenCount() + 1);

                                return answerRepository.save(existAnswer);
                            })
                            .orElseThrow(()-> new RuntimeException("Survey not found"));
                }
            }


        }
        surveyRepository.findById(survey.getId())
                .map(existSurvey ->{
                    existSurvey.setTotalAttempts(existSurvey.getTotalAttempts() + 1);

                    return surveyRepository.save(existSurvey);
                })
                .orElseThrow(()-> new RuntimeException("Survey not found"));



        return ResponseEntity.ok("ok");
    }




    public ResponseEntity<?> addSurvey(@RequestBody NewSurveyDTO surveyFromFrontend) {
        ObjectMapper mapper = new ObjectMapper();
        NewSurveyDTO newSurvey = mapper.convertValue(surveyFromFrontend, NewSurveyDTO.class);


//        System.out.println("saved " + newSurvey.toJson());

        List<Question> questions = new ArrayList<>();
        Survey survey = new Survey(newSurvey.getUserId(), newSurvey.getTitle(), newSurvey.getDescription(), newSurvey.getTotalAttempts(), newSurvey.getRandomOrder(), questions);
        for(NewQuestionDTO question : newSurvey.getQuestions()) {

            List<Answer> answers = new ArrayList<>();
            Question newQuestion = new Question(survey, question.getName(), question.getType(),answers, question.getCorrectAnswer(), List.of(), question.getOpenAnswer());

            for(NewAnswerDTO answer : question.getAnswers()) {
                Answer newAnswer = new Answer(newQuestion, answer.getAnswerName(), answer.getChosenCount());
                answers.add(newAnswer);
            }

            newQuestion.setAnswers(answers);
            questions.add(newQuestion);



        }
        survey.setQuestions(questions);
        surveyRepository.save(survey);
//        System.out.println("saved " + survey.toJson());


//        surveyRepository.save(survey);
        return ResponseEntity.ok("ok");
    }


    public ResponseEntity<?> updateSurvey(JSONPObject survey) {

        // do przemyslenia czy wgl jest potrzebne

        JSONPObject jsonPObject = new JSONPObject("details", 1);

        return ResponseEntity.ok(jsonPObject);
    }
}
