package pl.edu.pw.PAMiW.backend.entities;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Parcel {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
}
