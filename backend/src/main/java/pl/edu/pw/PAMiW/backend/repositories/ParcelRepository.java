package pl.edu.pw.PAMiW.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.PAMiW.backend.entities.Parcel;

public interface ParcelRepository extends JpaRepository<Parcel, Long> {
}
