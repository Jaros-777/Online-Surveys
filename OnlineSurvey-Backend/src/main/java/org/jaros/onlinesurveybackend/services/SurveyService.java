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

    public ResponseEntity<?> getSurveyDetails(int id) {

        List<Survey> surveyList = surveyRepository.findByUserId(id);

        return ResponseEntity.ok(surveyList);
    }

    public ResponseEntity<?> getSurvey(int id) {

        List<Survey> surveyList = surveyRepository.findById(id);

        return ResponseEntity.ok(surveyList);
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
