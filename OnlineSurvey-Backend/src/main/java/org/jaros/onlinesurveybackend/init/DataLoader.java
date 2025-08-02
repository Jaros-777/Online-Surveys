package org.jaros.onlinesurveybackend.init;

import org.jaros.onlinesurveybackend.model.Answer;
import org.jaros.onlinesurveybackend.model.Question;
import org.jaros.onlinesurveybackend.model.Survey;
import org.jaros.onlinesurveybackend.model.User;
import org.jaros.onlinesurveybackend.repository.SurveyRepository;
import org.jaros.onlinesurveybackend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SurveyRepository surveyRepository;

    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder, SurveyRepository surveyRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.surveyRepository = surveyRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        String rawPassword = "qweqwe";
        String encodedPassword = passwordEncoder.encode(rawPassword);

        User user = new User("qweqwe", encodedPassword);
        user = userRepository.save(user);


        Answer answer1 = new Answer( null, "Dog", 0);
        Answer answer2 = new Answer( null, "Cat", 0);
        Answer answer3 = new Answer( null, "Fish", 0);
        Answer answer4 = new Answer( null, "Mouse", 0);
        List<Answer> answers = List.of(answer1, answer2, answer3, answer4);
        Question question = new Question( null, "Favourite animal", "single", answers, List.of(), List.of(),null);
        Answer answer9 = new Answer( null, "Park", 0);
        Answer answer10 = new Answer( null, "In home", 0);
        Answer answer11 = new Answer( null, "In forest", 0);
        Answer answer12 = new Answer( null, "On the beach", 0);
        List<Answer> answers3 = List.of(answer9, answer10, answer11, answer12);
        Question question3 = new Question( null, "The best place for playing with animal", "multiple", answers3, List.of(), List.of(),null);
        answers.forEach(a -> a.setQuestion(question));
        answers3.forEach(a -> a.setQuestion(question3));

        Survey survey = new Survey(user.getId(), "Home animals", "Let's talk about animals", 0, false, List.of(question,question3));
        question.setSurvey(survey);
        question3.setSurvey(survey);
        surveyRepository.save(survey);

        Answer answer5 = new Answer( null, "Paris", 2);
        Answer answer6 = new Answer( null, "Barcelona", 1);
        Answer answer7 = new Answer( null, "London", 1);
        Answer answer8 = new Answer( null, "Los Angeles", 3);
        List<Answer> answers2 = List.of(answer5, answer6, answer7, answer8);
        Question question2 = new Question( null, "Favourite town", "single", answers2, List.of(5), List.of(),null);

        Answer answer13 = new Answer( null, "My favourite town is Torun", 1);
        List<Answer> answers4 = List.of(answer13);
        Question question4 = new Question(null, "Your favourite town", "open", answers4, List.of(), List.of(),null);
        answers2.forEach(a -> a.setQuestion(question2));
        answers4.forEach(a -> a.setQuestion(question4));

        Survey survey2 = new Survey(user.getId(), "Favourite town", "Let's talk about towns", 7, false, List.of(question2, question4));
        question2.setSurvey(survey2);
        question4.setSurvey(survey2);
        surveyRepository.save(survey2);

    }
}
