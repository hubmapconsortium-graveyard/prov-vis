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
  };
}

export default class Prov {
  constructor(prov, getNameForActivity = (id) => id) {
    this.getNameForActivity = getNameForActivity;

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


  getEntities(activity, relation) {
    return Object.values(this.prov[relation])
      .filter((pair) => this.getNameForActivity(pair['prov:activity'], this.prov) === activity)
      .map((pair) => pair['prov:entity']);
  }

  getParentEntities(activity) {
    return this.getEntities(activity, 'used');
  }

  getChildEntities(activity) {
    return this.getEntities(activity, 'wasGeneratedBy');
  }

  getActivities(entity, relation) {
    return Object.values(this.prov[relation])
      .filter((pair) => pair['prov:entity'] === entity)
      .map((pair) => this.getNameForActivity(pair['prov:activity'], this.prov));
  }

  getParentActivities(entity) {
    return this.getActivities(entity, 'wasGeneratedBy');
  }

  getChildActivities(entity) {
    return this.getActivities(entity, 'used');
  }


  makeCwlStep(activityId) {
    const activityName = this.getNameForActivity(activityId, this.prov);
    const inputs = this.getParentEntities(activityName)
      .map((entityId) => makeCwlInput(entityId, this.getParentActivities(entityId)));
    const outputs = this.getChildEntities(activityName)
      .map((entityId) => makeCwlOutput(entityId, this.getChildActivities(entityId)));
    return {
      name: activityName,
      inputs,
      outputs,
    };
  }

  toCwl() {
    return Object.keys(this.prov.activity).map(
      (activityId) => this.makeCwlStep(activityId),
    );
  }
}
