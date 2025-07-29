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

    @PostMapping("/userSurveys")
    public ResponseEntity<?> getSurveyDetails(@RequestBody SurveyRequest surveyRequest) {
        return surveyService.getSurveyDetails(surveyRequest.getId());
    }

    @PostMapping("/surveyTaker")
    public ResponseEntity<?> getSurvey(@RequestBody SurveyRequest surveyRequest) {
        return surveyService.getSurvey(surveyRequest.getId());
    }

    @PostMapping("/answer")
    public ResponseEntity<?> getSurveyAnswer(@RequestBody Survey survey) {
       return surveyService.getSurveyAnswer(survey);
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
