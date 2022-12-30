package pl.edu.pw.PAMiW.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.PAMiW.backend.entities.AppUser;
import pl.edu.pw.PAMiW.backend.entities.Parcel;
import pl.edu.pw.PAMiW.backend.entities.ParcelState;
import pl.edu.pw.PAMiW.backend.repositories.ParcelRepository;

import java.util.Collection;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ParcelService {

    private final ParcelRepository parcelRepository;
    private final ParcelLockerService parcelLockerService;
    private final AppUserService appUserService;
    private final KeycloakUserService keycloakUserService;
    public Parcel save(Parcel parcel) {
        parcel.setTo_locker(parcelLockerService.findByName(parcel.getTo_locker().getName()));
        parcel.setFrom_locker(parcelLockerService.findByName(parcel.getFrom_locker().getName()));
        AppUser sender = appUserService.findUserByKeycloakId(parcel.getSender().getKeycloak_id());
        if(sender == null)
            sender = appUserService.save(AppUser.builder().username(keycloakUserService
                    .getUsernameFromId(parcel.getSender().getKeycloak_id())).keycloak_id(parcel.getSender().getKeycloak_id()).build());
        parcel.setSender(sender);
        AppUser receiver = appUserService.findUserByUsername(parcel.getReceiver().getUsername());
        if(receiver == null)
            receiver = appUserService.save(AppUser.builder().username(parcel.getReceiver().getUsername())
                    .keycloak_id(keycloakUserService.getIdFromUsername(parcel.getReceiver().getUsername())).build());
        parcel.setReceiver(receiver);
        parcel.setState(ParcelState.POSTED);
        if(parcel.getId() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Don't provide id while trying to add parcel");
        }

        return parcelRepository.save(parcel);
    }

    public Collection<Parcel> findAll() {
        return parcelRepository.findAll();
    }

    public Parcel findById(Long id) {
        return parcelRepository.findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Parcel not found"));
    }

    public Parcel update(Long id, Parcel parcel) {
        parcel.setTo_locker(parcelLockerService.findByName(parcel.getTo_locker().getName()));
        parcel.setFrom_locker(parcelLockerService.findByName(parcel.getFrom_locker().getName()));
        AppUser receiver = appUserService.findUserByUsername(parcel.getReceiver().getUsername());
        if(receiver == null)
            receiver = appUserService.save(AppUser.builder().username(parcel.getReceiver().getUsername())
                    .keycloak_id(keycloakUserService.getIdFromUsername(parcel.getReceiver().getUsername())).build());
        parcel.setReceiver(receiver);
        if (!Objects.equals(id, parcel.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id and parcel.id is not equal");
        }
        return parcelRepository.save(parcel);
    }

    public void deleteById(Long id) {
        parcelRepository.deleteById(id);
    }
}
