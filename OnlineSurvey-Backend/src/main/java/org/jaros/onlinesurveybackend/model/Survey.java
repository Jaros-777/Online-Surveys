package org.jaros.onlinesurveybackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Survey {
    @Id
    private int id;
    private String name;
    private String description;
    private Boolean randomOrder;
    @OneToMany
    private List<Question> questions;
    @OneToOne
    @JoinColumn(name = "analytics_id")
    private Analytics analytics;
}
