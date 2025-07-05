package org.jaros.onlinesurveybackend.controllers;

import org.jaros.onlinesurveybackend.model.Login;
import org.jaros.onlinesurveybackend.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        return authService.Login(login);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Login login) {
        return authService.Register(login);
    }

}
