package org.jaros.onlinesurveybackend.repository;

import org.jaros.onlinesurveybackend.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SurveyRepository extends JpaRepository<Survey, Integer> {
    List<Survey> findByUserId(int userId);
}
