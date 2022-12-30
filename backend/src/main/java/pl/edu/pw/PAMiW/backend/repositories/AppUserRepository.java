package pl.edu.pw.PAMiW.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.PAMiW.backend.entities.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
}
