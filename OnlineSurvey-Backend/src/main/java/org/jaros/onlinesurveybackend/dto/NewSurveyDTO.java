package org.jaros.onlinesurveybackend.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jaros.onlinesurveybackend.model.Question;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class NewSurveyDTO {
    private int userId;
    private String title;
    private String description;
    private int totalAttempts;
    private Boolean randomOrder;
    private List<NewQuestionDTO> questions;

//    public NewSurveyDTO(int userId, String title, String description, int totalAttempts, Boolean randomOrder, List<Question> questions) {
//        this.userId = userId;
//        this.title = title;
//        this.description = description;
//        this.totalAttempts = totalAttempts;
//        this.randomOrder = randomOrder;
//        this.questions = questions;
//    }

    public String toJson() {
        ObjectMapper mapper = new ObjectMapper();
        try {

            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{}";
        }
    }
}
