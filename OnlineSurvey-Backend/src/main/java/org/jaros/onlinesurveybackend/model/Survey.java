package org.jaros.onlinesurveybackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int userId;
    private String title;
    private String description;
    private int totalAttempts;
    private Boolean randomOrder;
    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Question> questions;

    public Survey( int userId, String title, String description, int totalAttempts, Boolean randomOrder, List<Question> questions) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.totalAttempts = totalAttempts;
        this.randomOrder = randomOrder;
        this.questions = questions;
    }

    public String toJson() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // mapujemy obiekt na JSON string
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{}";  // albo zwróć null lub rzuć wyjątek wg potrzeb
        }
    }
}
