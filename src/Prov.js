import Ajv from 'ajv';

import schema from './schema.json';

// export only to test.
export function makeCwlInput(name, step, isReference) {
  const id = name;
  const source = {
    name,
    for_file: id,
  };
  if (step) {
    source.step = step;
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

function makeCwlStep(activityName, inputName, outputName) {
  // TODO: use makeCwlInput/makeCwlOutput
  return {
    name: activityName,
    inputs: [
      {
        meta: { global: true },
        name: inputName,
        source: [],
      },
    ],
    outputs: [
      {
        meta: { global: true },
        name: outputName,
        target: [
          {
            name: outputName,
          },
        ],
      },
    ],
  };
}

export default class Prov {
  constructor(prov) {
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
          (props) => [props['prov:activity'], props['prov:entity']],
        ),
    );
  }


  getEntities(activity, relation) {
    return Object.values(this.prov[relation])
      .filter((pair) => pair['prov:activity'] === activity)
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
      .map((pair) => pair['prov:activity']);
  }

  getParentActivities(entity) {
    return this.getActivities(entity, 'wasGeneratedBy');
  }

  getChildActivities(entity) {
    return this.getActivities(entity, 'used');
  }


  getActivityInOut(activityId) {
    const generatedByMap = this.getActivityEntityMap('wasGeneratedBy');
    const usedMap = this.getActivityEntityMap('used');
    return [usedMap[activityId], generatedByMap[activityId]];
  }

  toCwl() {
    const activityIds = Object.keys(this.prov.activity);
    const activityInOutMap = Object.fromEntries(activityIds.map((activityId) => [
      activityId, this.getActivityInOut(activityId),
    ]));

    return Object.entries(activityInOutMap).map(([activityId, ioPair]) => {
      const activityName = this.prov.activity[activityId]['prov:label'];
      const inputEntity = this.prov.entity[ioPair[0]];
      if (!inputEntity) {
        // Top-level entities for organizations are referenced but not defined.
        // They are not included in the visualization.
        // TODO: https://github.com/hubmapconsortium/prov-vis/issues/15
        return null;
      }
      const inputName = inputEntity['prov:label'];
      const outputEntity = this.prov.entity[ioPair[1]];
      const outputName = outputEntity['prov:label'];
      return makeCwlStep(activityName, inputName, outputName);
    }).filter(
      // Exclude nulls:
      // TODO: https://github.com/hubmapconsortium/prov-vis/issues/15
      (step) => step,
    );
  }
}
