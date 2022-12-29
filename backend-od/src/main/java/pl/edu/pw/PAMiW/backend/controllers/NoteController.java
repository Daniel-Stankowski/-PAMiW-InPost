package pl.edu.pw.PAMiW.backend.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Not;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.PAMiW.backend.entities.Note;
import pl.edu.pw.PAMiW.backend.services.NoteService;

import java.util.Collection;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @GetMapping
    Collection<Note> findAll() {
        return noteService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Note create(@RequestBody Note note) {
        return noteService.save(note);
    }

    @GetMapping("/{id}")
    Note findById(@PathVariable Long id) {
        return noteService.findById(id);
    }

    @PutMapping("/{id}")
    Note update(@PathVariable Long id, @RequestBody Note note) {
        return noteService.update(id, note);
    }

    @DeleteMapping("/{id}")
    void deleteById(@PathVariable Long id) {
        noteService.deleteById(id);
    }

    @GetMapping("/user/{keycloakId}")
    List<Note> getUserNotes(@PathVariable String keycloakId) {
        return noteService.findAllNotesOfUser(keycloakId);
    }
}
