package pl.edu.pw.PAMiW.backend.services;

import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KeycloakUserService {

    private static final String SERVER_URL = "http://keycloak-od:8080";
    private static final String REALM = "app";
    private static final String USERNAME = "admin";
    private static final String PASSWORD = "admin";
    private static final String CLIENT_ID = "admin-cli";

    List<UserRepresentation> getUsersRepresentations(){
        Keycloak keycloak = KeycloakBuilder
                .builder()
                .serverUrl(SERVER_URL)
                .realm("master")
                .username(USERNAME)
                .password(PASSWORD)
                .clientId(CLIENT_ID)
                .build();
        UsersResource usersResource = keycloak.realm(REALM).users();
        return usersResource.list();
    }

    public List<String> getAllUsernames() {
        return getUsersRepresentations().stream().map(userRepresentation -> userRepresentation.getUsername()).toList();
    }

    public String getUsernameFromId(String keycloakId) {
        Optional<UserRepresentation> ur = this.getUsersRepresentations().stream().filter(userRepresentation -> userRepresentation.getId()
                .equals(keycloakId)).findFirst();
        return ur.map(UserRepresentation::getUsername).orElse(null);
    }

    public String getIdFromUsername(String username) {
        Optional<UserRepresentation> ur = this.getUsersRepresentations().stream().filter(userRepresentation -> userRepresentation.getUsername()
                .equals(username)).findFirst();
        return ur.map(UserRepresentation::getId).orElse(null);
    }
}
