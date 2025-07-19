package org.jaros.onlinesurveybackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer {
    @Id
    private int id;
    @ManyToOne
    @JoinColumn(name = "question_id")
    @JsonBackReference
    private Question question;
    private String answerName;
    private int chosenCount;

    public Answer(int id, Question question, String answerName, int chosenCount) {
        this.id = id;
        this.question = question;
        this.answerName = answerName;
        this.chosenCount = chosenCount;
    }
}
