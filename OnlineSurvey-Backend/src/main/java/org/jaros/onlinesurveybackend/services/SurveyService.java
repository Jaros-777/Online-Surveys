package org.jaros.onlinesurveybackend.services;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.jaros.onlinesurveybackend.model.Answer;
import org.jaros.onlinesurveybackend.model.Question;
import org.jaros.onlinesurveybackend.model.Survey;
import org.jaros.onlinesurveybackend.repository.AnswerRepository;
import org.jaros.onlinesurveybackend.repository.QuestionRepository;
import org.jaros.onlinesurveybackend.repository.SurveyRepository;
import org.jaros.onlinesurveybackend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SurveyService {

    private final UserRepository userRepository;
    SurveyRepository surveyRepository;
    AnswerRepository answerRepository;
    QuestionRepository questionRepository;

    public SurveyService(SurveyRepository surveyRepository, UserRepository userRepository, AnswerRepository answerRepository, QuestionRepository questionRepository) {
        this.surveyRepository = surveyRepository;
        this.userRepository = userRepository;
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }

    public ResponseEntity<?> getSurveyDetails(int id) {

        List<Survey> surveyList = surveyRepository.findByUserId(id);

        return ResponseEntity.ok(surveyList);
    }

    public ResponseEntity<?> getSurvey(int id) {

        Optional<Survey> surveyList = surveyRepository.findById(id);

        return ResponseEntity.ok(surveyList);
    }

    public ResponseEntity<?> getSurveyAnswer(Survey survey) {




        System.out.println(survey.toJson());

        for(Question question : survey.getQuestions()) {

            if(Objects.equals(question.getType(), "open")) {

                Question questionFromDB = questionRepository.findById(question.getId()).orElse(null);


                Answer newAnswer = new Answer(questionFromDB, question.getAnswers().getFirst().getAnswerName());
                System.out.println(question.getAnswers().getFirst().getAnswerName());
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




    public ResponseEntity<?> addSurvey(JSONPObject newSurvey) {
        JSONPObject jsonPObject = new JSONPObject("details", 1);

        return ResponseEntity.ok(jsonPObject);
    }


    public ResponseEntity<?> updateSurvey(JSONPObject survey) {

        // do przemyslenia czy wgl jest potrzebne

        JSONPObject jsonPObject = new JSONPObject("details", 1);

        return ResponseEntity.ok(jsonPObject);
    }
}
