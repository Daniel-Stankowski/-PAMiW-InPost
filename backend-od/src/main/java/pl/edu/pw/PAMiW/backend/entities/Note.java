package pl.edu.pw.PAMiW.backend.entities;

import lombok.*;
import pl.edu.pw.PAMiW.backend.utils.Status;

import javax.persistence.*;

@Entity
@Table(name="note")
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {
    @Id
    @Column(name = "note_id")
    @GeneratedValue
    private Long id;

    private String note;

    private Status status;

    private String password;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "appUser_id")
    private AppUser owner;
}
