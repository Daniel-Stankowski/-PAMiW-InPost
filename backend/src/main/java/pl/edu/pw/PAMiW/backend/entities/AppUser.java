package pl.edu.pw.PAMiW.backend.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="appUsers")
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser {
    @Id
    @Column(name = "appUser_id")
    @GeneratedValue
    private Long id;

    private String username;

    private String keycloak_id;
}

