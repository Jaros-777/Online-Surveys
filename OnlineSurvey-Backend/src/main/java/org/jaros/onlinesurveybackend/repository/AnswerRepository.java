package org.jaros.onlinesurveybackend.repository;

import org.jaros.onlinesurveybackend.model.Answer;
import org.jaros.onlinesurveybackend.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    Optional<Answer> findById(int id);
}
