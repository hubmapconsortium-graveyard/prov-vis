import Ajv from 'ajv';

import schema from './schema.json';

// export only to test.
export function _makeCwlInput(name, steps, extras, isReference) {
  const id = name;
  const source = [{
    name,
    for_file: id,
  }];
  if (steps) {
    if (steps.length > 1) {
      throw new Error('Limited to 1 step');
    } else if (steps.length === 1) {
      [source[0].step] = steps;
    }
  }
  return {
    name,
    source,
    run_data: {
      file: [{ '@id': id }],
    },
    meta: {
      global: true,
      in_path: true,
      type: isReference ? 'reference file' : 'data file',
    },
    prov: extras || {}, // TODO: real-prov has unmatched ID: https://github.com/hubmapconsortium/prov-vis/issues/15
  };
}

// export only to test.
export function _makeCwlOutput(name, steps, extras) {
  const id = name;
  return {
    name,
    target:
      steps.map((step) => ({ step, name })),
    run_data: {
      file: [{ '@id': id }],
    },
    meta: {
      global: true,
      in_path: true,
    },
    // Domain-specific extras go here:
    prov: extras,
  };
}

export function _expand(needsExpansion, prefixMap) {
  // Walk the needsExpansion object, using prefixMap to expand the keys, and values, if needed.
  if (typeof needsExpansion !== 'object') {
    const [prefix, stem] = needsExpansion.split(':');
    if (stem) {
      return prefixMap[prefix] + stem;
    }
    return prefix;
  }
  return Object.fromEntries(
    Object.entries(needsExpansion).map(
      ([key, value]) => {
        const [prefix, stem] = key.split(':');
        return [prefixMap[prefix] + stem, _expand(value, prefixMap)];
      },
    ),
  );
}

export default class Prov {
  constructor(prov, getNameForActivity = (id) => id, getNameForEntity = (id) => id) {
    this._getNameForActivity = getNameForActivity;
    this._getNameForEntity = getNameForEntity;

    const validate = new Ajv().compile(schema);
    const valid = validate(prov);
    if (!valid) {
      const failureReason = JSON.stringify(validate.errors, null, 2);
      throw new Error(failureReason);
    }
    this.prov = prov;

    this.activityByName = Object.fromEntries(
      Object.entries(this.prov.activity).map(([activityId, activity]) => [
        this._getNameForActivity(activityId, this.prov), activity,
      ]),
    );

    this.entityByName = Object.fromEntries(
      Object.entries(this.prov.entity).map(([entityId, entity]) => [
        this._getNameForEntity(entityId, this.prov), entity,
      ]),
    );
  }

  expandPrefixes() {
    // Returns a new Prov object, with NS prefixes expanded.
    const expandedProv = { prefix: {} };
    Object.keys(this.prov).filter((k) => k !== 'prefix').forEach((topLevel) => {
      const needsExpansion = this.prov[topLevel];
      expandedProv[topLevel] = _expand(needsExpansion, this.prov.prefix);
    });
    return new Prov(expandedProv);
  }


  _getEntityNames(activityName, relation) {
    return Object.values(this.prov[relation])
      .filter((pair) => this._getNameForActivity(pair['prov:activity'], this.prov) === activityName)
      .map((pair) => this._getNameForEntity(pair['prov:entity'], this.prov));
  }

  _getParentEntityNames(activityName) {
    return this._getEntityNames(activityName, 'used');
  }

  _getChildEntityNames(activityName) {
    return this._getEntityNames(activityName, 'wasGeneratedBy');
  }

  _getActivityNames(entityName, relation) {
    return Object.values(this.prov[relation])
      .filter((pair) => this._getNameForEntity(pair['prov:entity'], this.prov) === entityName)
      .map((pair) => this._getNameForActivity(pair['prov:activity'], this.prov));
  }

  _getParentActivityNames(entityName) {
    return this._getActivityNames(entityName, 'wasGeneratedBy');
  }

  _getChildActivityNames(entityName) {
    return this._getActivityNames(entityName, 'used');
  }


  makeCwlStep(activityId) {
    const activityName = this._getNameForActivity(activityId, this.prov);
    const inputs = this._getParentEntityNames(activityName)
      .map(
        (entityName) => _makeCwlInput(
          entityName, this._getParentActivityNames(entityName), this.entityByName[entityName],
        ),
      );
    const outputs = this._getChildEntityNames(activityName)
      .map(
        (entityName) => _makeCwlOutput(
          entityName, this._getChildActivityNames(entityName), this.entityByName[entityName],
        ),
      );
    return {
      name: activityName,
      inputs,
      outputs,
      prov: this.prov.activity[activityId],
    };
  }

  toCwl() {
    return Object.keys(this.prov.activity).map(
      (activityId) => this.makeCwlStep(activityId),
    );
  }
}
