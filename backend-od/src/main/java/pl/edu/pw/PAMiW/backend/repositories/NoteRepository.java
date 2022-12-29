package pl.edu.pw.PAMiW.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.PAMiW.backend.entities.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
