import Ajv from 'ajv';

import schema from './schema.json';

export default class Prov {
  constructor(prov) {
    const validate = new Ajv().compile(schema);
    const valid = validate(prov);
    if (!valid) {
      const failureReason = JSON.stringify(validate.errors, null, 2);
      throw new Error(failureReason);
    }
    this.prov = prov;
  }

  getNamesMap(propName) {
    return Object.fromEntries(
      Object.entries(this.prov[propName])
        .map(
          ([id, props]) => [id, props['rdfs:label']],
        ),
    );
  }

  getActivityEntityMap(propName) {
    return Object.fromEntries(
      Object.values(this.prov[propName])
        .map(
          (props) => [props['prov:activity'], props['prov:entity']],
        ),
    );
  }

  getActivityInOut(activityId) {
    const generatedByMap = this.getActivityEntityMap('wasGeneratedBy');
    const usedMap = this.getActivityEntityMap('used');
    return [usedMap[activityId], generatedByMap[activityId]];
  }

  toCwl() {
    const activityId = 'ex:run';
    const [entityInputId, entityOutputId] = this.getActivityInOut(activityId);

    const activityName = this.prov.activity[activityId]['rdfs:label'];
    const inputName = this.prov.entity[entityInputId]['rdfs:label'];
    const outputName = this.prov.entity[entityOutputId]['rdfs:label'];

    return [
      {
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
      },
    ];
  }
}
