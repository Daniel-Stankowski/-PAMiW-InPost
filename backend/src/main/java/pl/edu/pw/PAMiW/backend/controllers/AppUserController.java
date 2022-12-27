package pl.edu.pw.PAMiW.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.PAMiW.backend.entities.AppUser;
import pl.edu.pw.PAMiW.backend.services.AppUserService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "users")
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService appUserService;
    @GetMapping(value = "/allUsernames")
    List<String> getAllNames() {
        return appUserService.findAllUsernames();
    }

    @GetMapping(value = "/all")
    List<AppUser> getAllUsers() {
        return appUserService.findAll().stream().toList();
    }
}
