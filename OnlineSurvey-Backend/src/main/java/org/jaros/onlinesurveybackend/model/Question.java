package org.jaros.onlinesurveybackend.model;

import com.fasterxml.jackson.databind.util.JSONPObject;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Question {

    @Id
    private int id;
    private String name;
    private String description;
    private Boolean randomOrder;
    @OneToMany
    private List<Answer> answers;
    @ElementCollection
    private List<Integer> correctAnswer;
    private String type;
}
