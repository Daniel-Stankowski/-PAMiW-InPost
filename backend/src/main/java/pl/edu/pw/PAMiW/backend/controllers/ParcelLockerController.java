package pl.edu.pw.PAMiW.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.PAMiW.backend.entities.ParcelLocker;
import pl.edu.pw.PAMiW.backend.services.ParcelLockerService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "parcelLockers")
@RequiredArgsConstructor
public class ParcelLockerController {
    private final ParcelLockerService parcelLockerService;

    @GetMapping(value = "/allNames")
    List<String> getAllNames() {
        return parcelLockerService.findAllParcelLockersNames();
    }

    @PostMapping
    ParcelLocker addParcelLocker(@RequestBody ParcelLocker parcelLocker) {
        return parcelLockerService.save(parcelLocker);
    }
}
