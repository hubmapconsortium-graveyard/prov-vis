export const simple = {
  prov: {
    prefix: {
      ex: 'http://example.org',
      w3: 'http://www.w3.org/',
    },
    entity: {
      'ex:input': {
        'prov:label': 'bedfile',
      },
      'ex:output': {
        'prov:label': 'beddbfile',
      },
    },
    activity: {
      'ex:run': {
        'prov:label': 'bedtobeddb',
      },
    },
    wasGeneratedBy: {
      '_:1': {
        'prov:activity': 'ex:run',
        'prov:entity': 'ex:output',
      },
    },
    used: {
      '_:2': {
        'prov:activity': 'ex:run',
        'prov:entity': 'ex:input',
      },
    },
  },
  cwl: [
    {
      inputs: [
        {
          meta: {
            global: true,
          },
          name: 'bedfile',
          source: [],
        },
      ],
      name: 'bedtobeddb',
      outputs: [
        {
          meta: {
            global: true,
          },
          name: 'beddbfile',
          target: [
            {
              name: 'beddbfile',
            },
          ],
        },
      ],
    },
  ],
};

export const real = {
  prov: {
    prefix: {
      ex: 'http://example.org',
      hubmap: 'https://hubmapconsortium.org',
      dct: 'http://purl.org/dc/terms/',
      foaf: 'http://xmlns.com/foaf/0.1/',
    },
    entity: {
      'hubmap:entities/d6be7b5ec50dacd4e8faf45c78e4b7c9': {
        'prov:label': 'TEST0025-SI-1',
        'prov:type': 'Sample',
        'hubmap:doi': '695PTTF384',
        'hubmap:display_doi': 'HBM695.PTTF.384',
        'hubmap:display_identifier': 'TEST0025-SI-1',
        'hubmap:uuid': 'd6be7b5ec50dacd4e8faf45c78e4b7c9',
      },
      'hubmap:entities/7dde784299770261b6b09f396642c22a': {
        'prov:label': 'TEST0025-SI',
        'prov:type': 'Sample',
        'hubmap:doi': '858XDZJ484',
        'hubmap:display_doi': 'HBM858.XDZJ.484',
        'hubmap:display_identifier': 'TEST0025-SI',
        'hubmap:uuid': '7dde784299770261b6b09f396642c22a',
      },
      'hubmap:entities/68eb352a2f09069d265bec86512774a6': {
        'prov:label': 'TEST0025',
        'prov:type': 'Donor',
        'hubmap:doi': '595BMVX722',
        'hubmap:display_doi': 'HBM595.BMVX.722',
        'hubmap:display_identifier': 'TEST0025',
        'hubmap:uuid': '68eb352a2f09069d265bec86512774a6',
      },
    },
    activity: {
      'hubmap:activities/acf9ec3aeff850a23a2aa4b29225b724': {
        'prov:startTime': '2019-10-16T14:10:17',
        'prov:endTime': '2019-10-16T14:10:17',
        'prov:label': 'acf9ec3aeff850a23a2aa4b29225b724',
        'prov:type': 'Create Sample Activity',
        'hubmap:doi': '838FQPR257',
        'hubmap:display_doi': 'HBM838.FQPR.257',
        'hubmap:display_identifier': 'acf9ec3aeff850a23a2aa4b29225b724',
        'hubmap:uuid': 'acf9ec3aeff850a23a2aa4b29225b724',
      },
      'hubmap:activities/9245d8a4314ad4891e123c0bf67fa746': {
        'prov:startTime': '2019-10-16T14:00:15',
        'prov:endTime': '2019-10-16T14:00:15',
        'prov:label': '9245d8a4314ad4891e123c0bf67fa746',
        'prov:type': 'Create Sample Activity',
        'hubmap:doi': '274GKRN376',
        'hubmap:display_doi': 'HBM274.GKRN.376',
        'hubmap:display_identifier': '9245d8a4314ad4891e123c0bf67fa746',
        'hubmap:uuid': '9245d8a4314ad4891e123c0bf67fa746',
      },
      'hubmap:activities/b3f9408bc2d2c0bdd9a30705f4d1d6a3': {
        'prov:startTime': '2019-10-16T13:59:00',
        'prov:endTime': '2019-10-16T13:59:00',
        'prov:label': 'b3f9408bc2d2c0bdd9a30705f4d1d6a3',
        'prov:type': 'Register Donor Activity',
        'hubmap:doi': '494FVJF666',
        'hubmap:display_doi': 'HBM494.FVJF.666',
        'hubmap:display_identifier': 'b3f9408bc2d2c0bdd9a30705f4d1d6a3',
        'hubmap:uuid': 'b3f9408bc2d2c0bdd9a30705f4d1d6a3',
      },
    },
    wasGeneratedBy: {
      '_:id1': {
        'prov:entity': 'hubmap:entities/d6be7b5ec50dacd4e8faf45c78e4b7c9',
        'prov:activity': 'hubmap:activities/acf9ec3aeff850a23a2aa4b29225b724',
      },
      '_:id3': {
        'prov:entity': 'hubmap:entities/7dde784299770261b6b09f396642c22a',
        'prov:activity': 'hubmap:activities/9245d8a4314ad4891e123c0bf67fa746',
      },
      '_:id5': {
        'prov:entity': 'hubmap:entities/68eb352a2f09069d265bec86512774a6',
        'prov:activity': 'hubmap:activities/b3f9408bc2d2c0bdd9a30705f4d1d6a3',
      },
    },
    used: {
      '_:id2': {
        'prov:activity': 'hubmap:activities/acf9ec3aeff850a23a2aa4b29225b724',
        'prov:entity': 'hubmap:entities/7dde784299770261b6b09f396642c22a',
      },
      '_:id4': {
        'prov:activity': 'hubmap:activities/9245d8a4314ad4891e123c0bf67fa746',
        'prov:entity': 'hubmap:entities/68eb352a2f09069d265bec86512774a6',
      },
      '_:id6': {
        'prov:activity': 'hubmap:activities/b3f9408bc2d2c0bdd9a30705f4d1d6a3',
        'prov:entity': 'hubmap:entities/5bd084c8-edc2-11e8-802f-0e368f3075e8',
      },
    },
  },
  cwl: [],
};

// The demos reference the default export:
// Update this to update all the demos.
export default simple;
