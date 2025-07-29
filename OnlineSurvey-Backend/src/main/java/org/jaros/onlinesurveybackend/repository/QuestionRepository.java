package org.jaros.onlinesurveybackend.repository;

import org.jaros.onlinesurveybackend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface QuestionRepository extends JpaRepository<Question, Integer> {
    Optional<Question> findById(Integer id);
}
