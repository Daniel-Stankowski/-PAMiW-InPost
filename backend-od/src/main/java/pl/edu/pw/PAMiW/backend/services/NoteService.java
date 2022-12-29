package pl.edu.pw.PAMiW.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.PAMiW.backend.entities.AppUser;
import pl.edu.pw.PAMiW.backend.entities.Note;
import pl.edu.pw.PAMiW.backend.repositories.NoteRepository;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;
    private final KeycloakUserService keycloakUserService;
    private final AppUserService appUserService;

    public Note save(Note note) {
        AppUser owner = appUserService.findUserByKeycloakId(note.getOwner().getKeycloak_id());
        if(owner == null)
            owner = appUserService.save(AppUser.builder().username(keycloakUserService.getUsernameFromId(note.getOwner()
                    .getKeycloak_id())).keycloak_id(note.getOwner().getKeycloak_id()).build());
        note.setOwner(owner);
        return noteRepository.save(note);
    }

    public Collection<Note> findAll() {
        return noteRepository.findAll();
    }

    public Note findById(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Note not found"));
    }

    public List<Note> findAllNotesOfUser(String keycloak_id) {
        return noteRepository.findAll().stream()
                .filter(note -> note.getOwner().getKeycloak_id().equals(keycloak_id)).toList();
    }

    public void deleteById(Long id) {
        noteRepository.deleteById(id);
    }

    public Note update(Long id, Note note) {
        if (!Objects.equals(id, note.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id and note.id is not equal");
        }
        return noteRepository.save(note);
    }
}
