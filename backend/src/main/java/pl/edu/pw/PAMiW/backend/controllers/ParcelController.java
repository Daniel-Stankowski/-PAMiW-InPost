package pl.edu.pw.PAMiW.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.PAMiW.backend.entities.Parcel;
import pl.edu.pw.PAMiW.backend.services.ParcelService;

import java.util.Collection;

@Slf4j
@RestController
@RequestMapping(value = "parcels")
@RequiredArgsConstructor
public class ParcelController {
    private final ParcelService parcelService;

    @GetMapping
    Collection<Parcel> findAll() {
        log.debug("Find all parcels");
        return parcelService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Parcel create(@RequestBody Parcel parcel) {
        log.debug("Create parcel: {}", parcel);
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
