package org.jaros.onlinesurveybackend.services;

import org.jaros.onlinesurveybackend.model.Login;
import org.jaros.onlinesurveybackend.model.User;
import org.jaros.onlinesurveybackend.repository.UserRepository;
import org.jaros.onlinesurveybackend.security.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;

import java.util.ArrayList;
import java.util.Map;


@Service
public class AuthService implements UserDetailsService {
    @Override
    public  UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return  userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public  ResponseEntity<?> Login(Login login) {
        try {
            UserDetails userDetails = loadUserByUsername(login.getEmail());


            if (passwordEncoder.matches(login.getPassword(), userDetails.getPassword())) {

                User user = userRepository.findByEmail(login.getEmail())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                String token = jwtUtil.generateToken(login.getEmail());
                System.out.println("Użytkownik zalogowany: " + login.getEmail());



                return ResponseEntity.ok()
                        .body(Map.of("token", token, "email", login.getEmail(), "userId", user.getId()));

            } else {
                System.out.println("Niepoprawne hasło dla: " + login.getEmail());
                return ResponseEntity.status(401).body("Niepoprawne hasło");
            }
        } catch (UsernameNotFoundException ex) {
            System.out.println("Nie znaleziono użytkownika: " + login.getEmail());
            return ResponseEntity.status(401).body("Użytkownik nie istnieje");
        }
    }

    public ResponseEntity<?> Register(Login login) {

        if(!userRepository.existsByEmail(login.getEmail())){
            userRepository.save(new User(login.getEmail(), passwordEncoder.encode(login.getPassword())));
//            String token = jwtUtil.generateToken(login.getEmail());
//
//            return ResponseEntity.ok()
//                    .body(Map.of("token", token, "email", login.getEmail()));
            return ResponseEntity.ok().body("Correct");
        }else{
            return ResponseEntity.status(401).body("Użytkownik już istnieje");
        }



    }





}
