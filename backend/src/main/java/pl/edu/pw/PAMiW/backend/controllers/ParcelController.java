package pl.edu.pw.PAMiW.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.PAMiW.backend.entities.AppUser;
import pl.edu.pw.PAMiW.backend.entities.Parcel;
import pl.edu.pw.PAMiW.backend.entities.ParcelLocker;
import pl.edu.pw.PAMiW.backend.entities.ParcelState;
import pl.edu.pw.PAMiW.backend.services.AppUserService;
import pl.edu.pw.PAMiW.backend.services.KeycloakUserService;
import pl.edu.pw.PAMiW.backend.services.ParcelLockerService;
import pl.edu.pw.PAMiW.backend.services.ParcelService;

import java.util.Collection;

@Slf4j
@RestController
@RequestMapping(value = "parcels")
@RequiredArgsConstructor
public class ParcelController {
    private final ParcelService parcelService;
    private final ParcelLockerService parcelLockerService;
    private final AppUserService appUserService;
    private final KeycloakUserService keycloakUserService;
    @GetMapping
    Collection<Parcel> findAll() {
        log.debug("Find all parcels");
        return parcelService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Parcel create(@RequestBody Parcel parcel) {
        log.info("Create parcel: {}", parcel);
        parcel.setTo_locker(parcelLockerService.findByName(parcel.getTo_locker().getName()));
        log.info("After to locker: {}", parcel);
        parcel.setFrom_locker(parcelLockerService.findByName(parcel.getFrom_locker().getName()));
        log.info("After from locker: {}", parcel);
        AppUser sender = appUserService.findUserByKeycloakId(parcel.getSender().getKeycloak_id());
        if(sender == null)
            sender = appUserService.save(AppUser.builder().username(keycloakUserService
                    .getUsernameFromId(parcel.getSender().getKeycloak_id())).keycloak_id(parcel.getSender().getKeycloak_id()).build());
        parcel.setSender(sender);
        log.info("After sender: {}", parcel);
        parcel.setReceiver(appUserService.findByKeycloakId(parcel.getReceiver().getKeycloak_id()));
        log.info("After receiver: {}", parcel);
        parcel.setState(ParcelState.POSTED);
        log.info("After state: {}", parcel);
        return parcelService.save(parcel);
    }

    @GetMapping("/{id}")
    Parcel findById(@PathVariable Long id) {
        log.debug("Find parcel with id: {}", id);
        return parcelService.findById(id);
    }

    @PutMapping("/{id}")
    Parcel update(@PathVariable Long id, @RequestBody Parcel parcel) {
        log.debug("Update parcel with id: {}, with parcel {}", id, parcel);
        return parcelService.update(id, parcel);
    }

    @DeleteMapping("/{id}")
    void deleteEmployee(@PathVariable Long id) {
        log.debug("Delete parcel with id: {}", id);
        parcelService.deleteById(id);
    }
}
