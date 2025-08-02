package org.jaros.onlinesurveybackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "question_id")
    @JsonBackReference
    private Question question;
    private String answerName;
    private int chosenCount;

    //for data loader
    public Answer( Question question, String answerName, int chosenCount) {
        this.question = question;
        this.answerName = answerName;
        this.chosenCount = chosenCount;
    }
    //for surveySerive.getSurveyAnswer - open answers
    public Answer( Question question, String answerName) {
        this.id = UUID.randomUUID().toString().hashCode();
        this.question = question;
        this.answerName = answerName;
    }
}
