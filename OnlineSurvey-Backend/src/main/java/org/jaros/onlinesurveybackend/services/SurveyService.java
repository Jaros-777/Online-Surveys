package org.jaros.onlinesurveybackend.services;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SurveyService {
    private SurveyService surveyService;

    public SurveyService(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    public ResponseEntity<?> getGeneralInfo(int id) {
        JSONPObject jsonPObject = new JSONPObject("general", 1);

        return ResponseEntity.ok(jsonPObject);
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
