package org.jaros.onlinesurveybackend.controllers;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.jaros.onlinesurveybackend.model.Survey;
import org.jaros.onlinesurveybackend.model.SurveyRequest;
import org.jaros.onlinesurveybackend.services.SurveyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/survey")
public class SurveyController {
    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping("/general")
    public ResponseEntity<?> getSurveyDetails(@RequestBody SurveyRequest surveyRequest) {
        return surveyService.getSurveyDetails(surveyRequest.getId());
    }

    @PostMapping("/for-user")
    public ResponseEntity<?> getSurvey(@RequestBody SurveyRequest surveyRequest) {
        return surveyService.getSurvey(surveyRequest.getId());
    }

    @PostMapping("/answered")
    public ResponseEntity<?> getSurveyAnswer(@RequestBody SurveyRequest surveyRequest) {
       return surveyService.getSurveyAnswer(surveyRequest);
    }




    @PostMapping("/new")
    public ResponseEntity<?> addSurvey(JSONPObject newSurvey) {

        return surveyService.addSurvey(newSurvey);
    }


    @PostMapping("/details")
    public ResponseEntity<?> updateSurvey(JSONPObject survey) {

        // do przemyslenia czy wgl jest potrzebne

        return surveyService.updateSurvey(survey);
    }
}
