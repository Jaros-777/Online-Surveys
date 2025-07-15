package org.jaros.onlinesurveybackend.controllers;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.jaros.onlinesurveybackend.services.SurveyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/survey")
public class SurveyController {
    private final SurveyService surveyService;
    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping("/general")
    public ResponseEntity<?> getGeneral(int id) {
        // lista wszysktihc ankiet - id, nazwa, ilosc odpowiedzi
        return surveyService.getGeneralInfo(id);
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
