import {backendApi} from "./backendApi";
import {bearerAuth} from "./bearerAuth";

const parcelLockerClient = backendApi('/parcelLockers')

export const parcelLockersApi = {
    getAllNames(token) {
        console.log('Getting all parcelLockers')
        return parcelLockerClient.get('/allNames', {
            headers: {'Authorization': bearerAuth(token)}
        })
    }
}