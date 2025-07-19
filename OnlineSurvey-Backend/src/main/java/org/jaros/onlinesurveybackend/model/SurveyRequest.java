package org.jaros.onlinesurveybackend.model;

import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class SurveyRequest {

    private int id;
    private Map<String, Object> json;

    public SurveyRequest(int id, Map<String, Object> json) {
        this.id = id;
        this.json = json;
    }

    public SurveyRequest(int id) {
        this.id = id;
    }
}
