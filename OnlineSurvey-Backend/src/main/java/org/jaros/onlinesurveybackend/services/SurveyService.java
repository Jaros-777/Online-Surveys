package org.jaros.onlinesurveybackend.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.jaros.onlinesurveybackend.model.Survey;
import org.jaros.onlinesurveybackend.repository.SurveyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyService {

    SurveyRepository surveyRepository;

    public SurveyService(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    public ResponseEntity<?> getGeneralInfo(int id) {
        ObjectMapper mapper = new ObjectMapper();

        List<Survey> surveyList = surveyRepository.findByUserId(id);

//        System.out.println("Ilosc ankiet: " + surveyList.size());
//
//        for(Survey survey : surveyList) {
//            System.out.println(survey.toString());
//        }


        return ResponseEntity.ok(surveyList);
    }


    public ResponseEntity<?> getDetailsInfo(int id) {
        JSONPObject jsonPObject = new JSONPObject("details", 1);

        return ResponseEntity.ok(jsonPObject);
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
