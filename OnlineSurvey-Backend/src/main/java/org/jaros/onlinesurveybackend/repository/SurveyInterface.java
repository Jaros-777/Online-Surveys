package org.jaros.onlinesurveybackend.repository;

import org.jaros.onlinesurveybackend.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyInterface extends JpaRepository<Survey, Integer> {
}
