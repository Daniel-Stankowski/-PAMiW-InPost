import { backendApi } from './backendApi'
import {bearerAuth} from "./bearerAuth";

const keycloakUsersClient = backendApi('/keycloakUsers')

export const keycloakUsersApi = {
    getAllUsernames(token) {
        console.log('Getting all usernames from keycloak')
        return keycloakUsersClient.get('/allUsernames', {
            headers: {'Authorization': bearerAuth(token)}
        })
    }
}