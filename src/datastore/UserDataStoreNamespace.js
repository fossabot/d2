import Api from '../api/Api';
import BaseStoreNamespace from './BaseStoreNamespace';

/**
 * @description
 * Represents a namespace in the dataStore that can be used to be used to interact with
 * the remote API.
 *
 * @property {Array} keys an array of the loaded keys.
 * @property {String} namespace Name of the namespace as on the server.
 *
 * @memberof module:datastore
 */
class UserDataStoreNamespace extends BaseStoreNamespace {
    constructor(namespace, keys, api = Api.getApi(), endPoint = 'userDataStore') {
        super(namespace, keys, api, endPoint);
    }
}

export default UserDataStoreNamespace;
