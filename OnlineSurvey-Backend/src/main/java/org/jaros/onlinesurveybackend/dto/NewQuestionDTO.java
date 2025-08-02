package org.jaros.onlinesurveybackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class NewQuestionDTO {
    private String name;
    private String type;
    private List<NewAnswerDTO> answers;
    private List<Integer> correctAnswer;
    private List<Integer> chosenAnswers;
    private List<String> openAnswer;
}
