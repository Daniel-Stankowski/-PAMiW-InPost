package pl.edu.pw.PAMiW.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.PAMiW.backend.entities.AppUser;
import pl.edu.pw.PAMiW.backend.repositories.AppUserRepository;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserService {
    private final AppUserRepository appUserRepository;

    public AppUser save(AppUser appUser) {
        if(appUser.getId() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Don't provide id while trying to add user");
        }

        return appUserRepository.save(appUser);
    }

    public Collection<AppUser> findAll() {
        return appUserRepository.findAll();
    }

    public AppUser findById(Long id) {
        return appUserRepository.findById(id)
                .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "AppUser not found"));
    }

    public AppUser findByKeycloakId(String keycloakId) {
        return this.findAll().stream().filter( appUser -> appUser.getKeycloak_id().equals(keycloakId)).findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "AppUser not found"));
    }

    public List<String> findAllUsernames() {
        return this.findAll().stream().map(AppUser::getUsername).toList();
    }

    public AppUser findUserByUsername(String username) {
        return this.findAll().stream().filter(appUser -> appUser.getUsername().equals(username)).findFirst().orElse(null);
    }

    public AppUser findUserByKeycloakId(String keycloakId) {
        return this.findAll().stream().filter(appUser -> appUser.getKeycloak_id().equals(keycloakId)).findFirst().orElse(null);
    }
}
