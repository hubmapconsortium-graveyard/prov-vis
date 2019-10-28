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

  // getNamesMap(propName) {
  //   return Object.fromEntries(
  //     Object.entries(this.prov[propName])
  //       .map(
  //         ([id, props]) => [id, props['rdfs:label']],
  //       ),
  //   );
  // }

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
    const activityIds = Object.keys(this.prov.activity);
    const activityInOutMap = Object.fromEntries(activityIds.map((activityId) => [
      activityId, this.getActivityInOut(activityId),
    ]));

    return Object.entries(activityInOutMap).map(([activityId, ioPair]) => {
      console.warn([activityId, ioPair]);
      const activityName = this.prov.activity[activityId]['prov:label'];
      const inputEntity = this.prov.entity[ioPair[0]];
      if (!inputEntity) {
        // Top-level entities for organizations are referenced but not defined.
        // They are not included in the visualization.
        return null;
      }
      const inputName = inputEntity['prov:label'];
      const outputEntity = this.prov.entity[ioPair[1]]
      const outputName = outputEntity['prov:label'];
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
    }).filter(
      // Exclude nulls:
      step => step
    );
  }
}
