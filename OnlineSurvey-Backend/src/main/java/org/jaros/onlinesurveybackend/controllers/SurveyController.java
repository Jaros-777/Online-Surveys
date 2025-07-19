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
    public ResponseEntity<?> getGeneral(@RequestBody SurveyRequest surveyRequest) {
        // lista wszysktihc ankiet - id, nazwa, ilosc odpowiedzi
//        System.out.println("Controller - Id uzytkownika: " + surveyRequest.getId());
        return surveyService.getGeneralInfo(surveyRequest.getId());
    }


    @GetMapping("/details")
    public ResponseEntity<?> getDetails(int id) {
        // wszytsko - podglad wszystkich pytan + analityka
        return surveyService.getDetailsInfo(id);
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
