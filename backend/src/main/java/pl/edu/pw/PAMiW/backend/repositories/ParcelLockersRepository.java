package pl.edu.pw.PAMiW.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.PAMiW.backend.entities.ParcelLocker;

public interface ParcelLockersRepository extends JpaRepository<ParcelLocker, Long> {
}
