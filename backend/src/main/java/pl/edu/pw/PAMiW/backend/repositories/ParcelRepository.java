package pl.edu.pw.PAMiW.backend.repositories;

import pl.edu.pw.PAMiW.backend.entities.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParcelRepository extends JpaRepository<Parcel, Long> {

}
