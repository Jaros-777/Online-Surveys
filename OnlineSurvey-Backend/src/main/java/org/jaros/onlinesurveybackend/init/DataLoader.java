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

        // 2. Utwórz odpowiedzi (ID nadawane ręcznie)
        Answer answer1 = new Answer(0, null, "Pies", 0);
        Answer answer2 = new Answer(1, null, "Kot", 0);
        Answer answer3 = new Answer(2, null, "Rybka", 0);
        Answer answer4 = new Answer(3, null, "Mysz", 0);
        List<Answer> answers = List.of(answer1, answer2, answer3, answer4);

        // 3. Utwórz pytanie (ID ręczny), przypisz odpowiedzi
        Question question = new Question( 0,null, "Ulubione zwierzę", "single", answers, List.of(0));

        // 4. Ustaw relację answer → question
        answers.forEach(a -> a.setQuestion(question));

        // 5. Utwórz ankietę, przypisz pytanie
        Survey survey = new Survey(user.getId(), "Zwierzęta w domu", "Porozmawiajmy o zwierzętach domowych", 0, false, List.of(question));

        // 6. Ustaw relację question → survey
        question.setSurvey(survey);

        // 7. Zapisz całość (dzieki cascade = ALL zapisze się wszystko)
        surveyRepository.save(survey);
//        System.out.println("Saved survey with userId = " + survey.getUserId());
//        System.out.println(survey.toString());

    }
}
