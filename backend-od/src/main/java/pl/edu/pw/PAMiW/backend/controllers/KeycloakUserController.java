package pl.edu.pw.PAMiW.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pw.PAMiW.backend.services.KeycloakUserService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "keycloakUsers")
@RequiredArgsConstructor
public class KeycloakUserController {
    private final KeycloakUserService keycloakUserService;

    @GetMapping(value = "/allUsernames")
    List<String> getAllUsernames() {
        return keycloakUserService.getAllUsernames();
    }
}
