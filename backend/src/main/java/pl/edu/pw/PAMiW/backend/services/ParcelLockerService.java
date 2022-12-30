package pl.edu.pw.PAMiW.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.PAMiW.backend.entities.ParcelLocker;
import pl.edu.pw.PAMiW.backend.repositories.ParcelLockersRepository;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParcelLockerService {
    private final ParcelLockersRepository parcelLockersRepository;

    public ParcelLocker save(ParcelLocker parcelLocker) {
        if(parcelLocker.getId() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Don't provide id while trying to add parcel locker");
        }
        return parcelLockersRepository.save(parcelLocker);
    }

    public Collection<ParcelLocker> findAll() {
        return parcelLockersRepository.findAll();
    }

    public ParcelLocker findById(Long id) {
        return parcelLockersRepository.findById(id).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Parcel locker not found"));
    }

    public void deleteById(Long id) {
        parcelLockersRepository.deleteById(id);
    }

    public ParcelLocker findByName(String name) {
        return this.findAll().stream().filter(parcelLocker -> parcelLocker.getName().equals(name)).findFirst().orElse(null);
    }

    public List<String> findAllParcelLockersNames() {
        return this.findAll().stream().map(ParcelLocker::getName).toList();
    }
}
