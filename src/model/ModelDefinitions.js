import {checkType} from '../lib/check';

/**
 * @class ModelDefinitions
 *
 * @description
 * Contains all the `ModelDefinition`s that are available. The definitions are properties on the object.
 * This would be used as a main entry point to do any interaction.
 *
 * After calling the initialise function `d2({baseUrl: 'dhis/api'})` this object is the `models` property
 * that allows you to access
 *
 * ```js
 * models.dataElement.getList();
 * ```
 */
class ModelDefinitions {
    // TODO: Elaborate this documentation
    /**
     * @method add
     * @param {ModelDefinition} modelDefinition Add a model definition to the definitions collection
     *
     * @description
     * This will allow you to add your own custom ModelDefinitions.
     *
     * The Definition object should have the following properties
     * `modelName, modelNamePlural, modelOptions, properties, validations`
     *
     * ```js
     * models.add({name: 'MyDefinition', plural: 'MyDefinitions', endPointname: '/myDefinition'});
     * ```
     */
    add(modelDefinition) {
        try {
            checkType(modelDefinition.name, 'string');
        } catch (e) {
            throw new Error('Name should be set on the passed ModelDefinition to add one');
        }

        if (this[modelDefinition.name]) {
            throw new Error(['Model', modelDefinition.name, 'already exists'].join(' '));
        }
        this[modelDefinition.name] = modelDefinition;
    }

    /**
     * @method mapThroughDefinitions
     *
     * @param {Function} transformer Transformer function that will be run for each `ModelDefinition`
     * @returns {Array} Array with the `ModelDefinition` objects.
     *
     * @description
     * Map through the modelDefinitions like you would with a simple `Array.map()`
     *
     * ```js
     * models.mapThroughDefinitions(definition => console.log(definition.name);
     * ```
     *
     * @note {info} When mapping through the definition list `transformer` is called with the just the definition
     * Unlike other map functions, no index or the full object is being passed.
     *
     * @note {warn} The resulting array contains references to the actual objects. It does not work like immutable array functions.
     *
     */
    mapThroughDefinitions(transformer) {
        const result = [];
        let modelDefinition;

        checkType(transformer, 'function', 'transformer');

        for (modelDefinition in this) {
            if (this.hasOwnProperty(modelDefinition)) {
                result.push(transformer(this[modelDefinition]));
            }
        }

        return result;
    }
}

export default ModelDefinitions;
