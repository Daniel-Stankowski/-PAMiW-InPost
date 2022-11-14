package pl.edu.pw.PAMiW.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.PAMiW.backend.entities.Parcel;
import pl.edu.pw.PAMiW.backend.repositories.ParcelRepository;

import java.util.Collection;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ParcelService {

    private final ParcelRepository parcelRepository;

    public Parcel save(Parcel parcel) {
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
        if (!Objects.equals(id, parcel.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id and parcel.id is not equal");
        }
        return parcelRepository.save(parcel);
    }

    public void deleteById(Long id) {
        parcelRepository.deleteById(id);
    }
}
