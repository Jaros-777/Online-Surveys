package org.jaros.onlinesurveybackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@Getter
public class NewAnswerDTO {
    private String answerName;
    private int chosenCount;
}
