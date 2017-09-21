import Api from '../api/Api';
import { isValidUid } from '../uid';

class GeoFeatures {
    constructor(orgUnits = [], displayProperty) {
        this.orgUnits = orgUnits;
        this.displayName = displayProperty;
    }

    byOrgUnit(orgUnits) {
        if (!orgUnits) {
            return this;
        }

        const orgUnitsArray = [].concat(orgUnits);

        if (!orgUnitsArray.every(GeoFeatures.isValidOrgUnit)) {
            throw new Error(`Invalid organisation unit: ${orgUnits}`);
        }

        return new GeoFeatures(orgUnitsArray, this.displayName);
    }

    displayProperty(displayName) {
        if (!displayName) {
            return this;
        }

        if (!GeoFeatures.isValidDisplayName(displayName)) {
            throw new Error(`Invalid display property: ${displayName}`);
        }

        return new GeoFeatures(this.orgUnits, this.userOrgUnits, displayName);
    }

    getAll() {
        const api = Api.getApi();
        const params = {};

        if (this.orgUnits.length) {
            params.ou = `ou:${this.orgUnits.join(';')}`;
        }

        if (this.displayName) {
            params.displayProperty = this.displayName;
        }

        return api.get('geoFeatures', params);
    }

    static isValidOrgUnit(orgUnit) {
        return (
            isValidUid(orgUnit) ||
            GeoFeatures.isValidOrgUnitLevel(orgUnit) ||
            GeoFeatures.isValidOrgUnitGroup(orgUnit) ||
            GeoFeatures.isValidUserOrgUnit(orgUnit)
        );
    }

    static isValidOrgUnitLevel(level) {
        return /^LEVEL-[0-9]+$/.test(level);
    }

    static isValidOrgUnitGroup(group) {
        const match = group.match(/OU_GROUP-(.*)$/);
        return Array.isArray(match) && isValidUid(match[1]);
    }

    static isValidUserOrgUnit(orgUnit) {
        return (
            orgUnit === GeoFeatures.USER_ORGUNIT ||
            orgUnit === GeoFeatures.USER_ORGUNIT_CHILDREN ||
            orgUnit === GeoFeatures.USER_ORGUNIT_GRANDCHILDREN
        );
    }

    static isValidDisplayName(displayName) {
        return (
            displayName === GeoFeatures.DISPLAY_PROPERTY_NAME ||
            displayName === GeoFeatures.DISPLAY_PROPERTY_SHORTNAME
        );
    }

    static getGeoFeatures(...args) {
        return new GeoFeatures(...args);
    }

    static DISPLAY_PROPERTY_NAME = 'NAME';
    static DISPLAY_PROPERTY_SHORTNAME = 'SHORTNAME';
    static USER_ORGUNIT = 'USER_ORGUNIT';
    static USER_ORGUNIT_CHILDREN = 'USER_ORGUNIT_CHILDREN';
    static USER_ORGUNIT_GRANDCHILDREN = 'USER_ORGUNIT_GRANDCHILDREN';
}

export default GeoFeatures;
