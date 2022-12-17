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
public class Parcel {
    @Id
    @Column(name = "parcel_id")
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "from_locker_id", referencedColumnName = "parcel_locker_id")
    private ParcelLocker from_locker;

    @ManyToOne
    @JoinColumn(name = "to_locker_id", referencedColumnName = "parcel_locker_id")
    private ParcelLocker to_locker;

    @ManyToOne
    @JoinColumn(name = "sender_id", referencedColumnName = "appUser_id")
    private AppUser sender_id;

    @ManyToOne
    @JoinColumn(name = "reciver_id", referencedColumnName = "appUser_id")
    private AppUser receiver_id;

    private ParcelState state;
}
