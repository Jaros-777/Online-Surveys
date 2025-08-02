package org.jaros.onlinesurveybackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.util.JSONPObject;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "survey_id")
    @JsonBackReference
    private Survey survey;
    private String name;
    private String type;
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Answer> answers;
    @ElementCollection
    private List<Integer> correctAnswer;
    @ElementCollection
    private List<Integer> chosenAnswers;
    @ElementCollection
    private List<String> openAnswer;

    //for data loader
    public Question(Survey survey, String name, String type, List<Answer> answers, List<Integer> correctAnswer, List<Integer> chosenAnswers, List<String> openAnswer) {

        this.survey = survey;
        this.name = name;
        this.type = type;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.chosenAnswers = chosenAnswers;
        this.openAnswer = openAnswer;
    }

}
