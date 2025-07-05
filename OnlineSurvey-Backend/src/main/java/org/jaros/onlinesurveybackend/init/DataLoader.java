package org.jaros.onlinesurveybackend.init;

import org.jaros.onlinesurveybackend.model.User;
import org.jaros.onlinesurveybackend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        String rawPassword = "qweqwe";
        String encodedPassword = passwordEncoder.encode(rawPassword);

        User user = new User("qweqwe", encodedPassword);
        userRepository.save(user);
    }
}
