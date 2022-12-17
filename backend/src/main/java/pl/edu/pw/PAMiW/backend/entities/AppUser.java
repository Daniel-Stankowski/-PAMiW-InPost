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
public class AppUser {
    @Id
    @Column(name = "appUser_id")
    @GeneratedValue
    private Long id;

    private String username;
}
