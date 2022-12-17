package pl.edu.pw.PAMiW.backend.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ParcelLocker {
    @Id
    @Column(name = "parcel_locker_id")
    @GeneratedValue
    private Long id;

    private String name;
}
