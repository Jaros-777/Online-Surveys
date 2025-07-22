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


        Answer answer1 = new Answer(0, null, "Dog", 3);
        Answer answer2 = new Answer(1, null, "Cat", 2);
        Answer answer3 = new Answer(2, null, "Fish", 1);
        Answer answer4 = new Answer(3, null, "Mouse", 0);
        List<Answer> answers = List.of(answer1, answer2, answer3, answer4);
        Question question = new Question( 0,null, "Favourite animal", "single", answers, List.of(0));
        Answer answer9 = new Answer(9, null, "Park", 3);
        Answer answer10 = new Answer(10, null, "In home", 2);
        Answer answer11 = new Answer(11, null, "In forest", 1);
        Answer answer12 = new Answer(12, null, "On the beach", 0);
        List<Answer> answers3 = List.of(answer9, answer10, answer11, answer12);
        Question question3 = new Question( 3,null, "The best place for playing with animal", "single", answers3, List.of(0));
        answers.forEach(a -> a.setQuestion(question));
        answers3.forEach(a -> a.setQuestion(question3));

        Survey survey = new Survey(user.getId(), "Home animals", "Let's talk about animals", 7, false, List.of(question,question3));
        question.setSurvey(survey);
        question3.setSurvey(survey);
        surveyRepository.save(survey);

        Answer answer5 = new Answer(4, null, "Paris", 2);
        Answer answer6 = new Answer(5, null, "Barcelona", 1);
        Answer answer7 = new Answer(6, null, "London", 1);
        Answer answer8 = new Answer(7, null, "Los Angeles", 3);
        List<Answer> answers2 = List.of(answer5, answer6, answer7, answer8);
        Question question2 = new Question( 1,null, "Favourite town", "single", answers2, List.of(0));

        Answer answer13 = new Answer(13, null, "My favourite town is Torun", 1);
        List<Answer> answers4 = List.of(answer13);
        Question question4 = new Question( 4,null, "Your favourite town", "open", answers4, List.of(0));
        answers2.forEach(a -> a.setQuestion(question2));
        answers4.forEach(a -> a.setQuestion(question4));

        Survey survey2 = new Survey(user.getId(), "Favourite town", "Let's talk about towns", 7, false, List.of(question2, question4));
        question2.setSurvey(survey2);
        question4.setSurvey(survey2);
        surveyRepository.save(survey2);

    }
}
