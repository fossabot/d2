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
class DataStoreNamespace extends BaseStoreNamespace {
    constructor(namespace, keys, api = Api.getApi(), endPoint = 'dataStore') {
        super(namespace, keys, api, endPoint);
    }

    /**
     * Retrieves metaData of given key in current namespace.
     * @param key to retrieve metaData for
     */
    getMetaData(key) {
        return this.api.get(
            [this.endPoint, this.namespace, key, 'metaData'].join('/'),
        );
    }
}
export default DataStoreNamespace;
