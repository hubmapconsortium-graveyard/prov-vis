import Ajv from 'ajv';

import schema from './schema.json';

// export only to test.
export function makeCwlInput(name, steps, isReference) {
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
    // TODO: Domain-specific extras go here:
    prov: { extras: 'go here' },
  };
}

// export only to test.
export function makeCwlOutput(name, steps) {
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
    // TODO: Domain-specific extras go here:
    prov: { extras: 'go here' },
  };
}

export default class Prov {
  constructor(prov, getNameForActivity = (id) => id, getNameForEntity = (id) => id) {
    this.getNameForActivity = getNameForActivity;
    this.getNameForEntity = getNameForEntity;

    const validate = new Ajv().compile(schema);
    const valid = validate(prov);
    if (!valid) {
      const failureReason = JSON.stringify(validate.errors, null, 2);
      throw new Error(failureReason);
    }
    this.prov = prov;

    this.generatedByMap = this.getActivityEntityMap('wasGeneratedBy');
    this.usedMap = this.getActivityEntityMap('used');
  }

  getActivityEntityMap(propName) {
    return Object.fromEntries(
      Object.values(this.prov[propName])
        .map(
          (props) => [this.getNameForActivity(props['prov:activity'], this.prov), props['prov:entity']],
        ),
    );
  }


  getEntities(activityName, relation) {
    return Object.values(this.prov[relation])
      .filter((pair) => this.getNameForActivity(pair['prov:activity'], this.prov) === activityName)
      .map((pair) => this.getNameForEntity(pair['prov:entity'], this.prov));
  }

  getParentEntities(activityName) {
    return this.getEntities(activityName, 'used');
  }

  getChildEntities(activityName) {
    return this.getEntities(activityName, 'wasGeneratedBy');
  }

  getActivities(entityName, relation) {
    return Object.values(this.prov[relation])
      .filter((pair) => this.getNameForEntity(pair['prov:entity'], this.prov) === entityName)
      .map((pair) => this.getNameForActivity(pair['prov:activity'], this.prov));
  }

  getParentActivities(entityName) {
    return this.getActivities(entityName, 'wasGeneratedBy');
  }

  getChildActivities(entityName) {
    return this.getActivities(entityName, 'used');
  }


  makeCwlStep(activityId) {
    const activityName = this.getNameForActivity(activityId, this.prov);
    const inputs = this.getParentEntities(activityName)
      .map(
        (entityName) => makeCwlInput(
          entityName, this.getParentActivities(entityName),
        ),
      );
    const outputs = this.getChildEntities(activityName)
      .map(
        (entityName) => makeCwlOutput(
          entityName, this.getChildActivities(entityName),
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
