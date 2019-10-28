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
      'hubmap:entities/0817f6a3a2f170486a49f2ffae46072d': {
        'prov:label': 'TEST0005-RK-4',
        'prov:type': 'Sample',
        'hubmap:doi': '576RGJR357',
        'hubmap:displayDOI': 'HBM:576-RGJR-357',
        'hubmap:displayIdentifier': 'TEST0005-RK-4',
        'hubmap:uuid': '0817f6a3a2f170486a49f2ffae46072d',
        'hubmap:metadata': "{\"protocols\": \"[{'id': 'protocol_1', 'protocol_url': 'http://protocols.io/protst/29022928394', 'protocol_file': ''}]\", \"specimen_type\": \"fresh_frozen_tissue\", \"user_group_uuid\": \"5bd084c8-edc2-11e8-802f-0e368f3075e8\", \"sample_count\": \"5\"}",
        'prov:generatedAtTime': '2019-09-17T16:40:04',
        'hubmap:groupName': 'hubmap-testing',
        'hubmap:userEmail': 'shirey@pitt.edu',
        'hubmap:userUUID': 'e19adbbb-73c3-43a7-b05e-0eead04f5ff8',
        'hubmap:groupUUID': '5bd084c8-edc2-11e8-802f-0e368f3075e8',
        'hubmap:modifiedTimestamp': '2019-09-17T16:40:04',
        'hubmap:userDisplayName': 'William Shirey',
      },
      'hubmap:entities/9942c58c009cb0a0f245f9cb61586af5': {
        'prov:label': 'TEST0005-RK',
        'prov:type': 'Sample',
        'hubmap:doi': '264TTTJ798',
        'hubmap:displayDOI': 'HBM:264-TTTJ-798',
        'hubmap:displayIdentifier': 'TEST0005-RK',
        'hubmap:uuid': '9942c58c009cb0a0f245f9cb61586af5',
        'hubmap:metadata': "{\"protocols\": \"[{'id': 'protocol_1', 'protocol_url': 'https://protocols.io/proddk/482829292833', 'protocol_file': ''}]\", \"organ\": \"RK\", \"specimen_type\": \"organ\", \"visit\": \"1\", \"user_group_uuid\": \"5bd084c8-edc2-11e8-802f-0e368f3075e8\"}",
        'prov:generatedAtTime': '2019-09-17T16:32:06',
        'hubmap:groupName': 'hubmap-testing',
        'hubmap:userEmail': 'shirey@pitt.edu',
        'hubmap:userUUID': 'e19adbbb-73c3-43a7-b05e-0eead04f5ff8',
        'hubmap:groupUUID': '5bd084c8-edc2-11e8-802f-0e368f3075e8',
        'hubmap:modifiedTimestamp': '2019-09-17T16:32:06',
        'hubmap:userDisplayName': 'William Shirey',
      },
      'hubmap:entities/12e77e69ab76b1832a95e00646f666db': {
        'prov:label': 'TEST0005-RK-5',
        'prov:type': 'Sample',
        'hubmap:doi': '555JCVC476',
        'hubmap:displayDOI': 'HBM:555-JCVC-476',
        'hubmap:displayIdentifier': 'TEST0005-RK-5',
        'hubmap:uuid': '12e77e69ab76b1832a95e00646f666db',
        'hubmap:metadata': "{\"protocols\": \"[{'id': 'protocol_1', 'protocol_url': 'http://protocols.io/protst/29022928394', 'protocol_file': ''}]\", \"specimen_type\": \"fresh_frozen_tissue\", \"user_group_uuid\": \"5bd084c8-edc2-11e8-802f-0e368f3075e8\", \"sample_count\": \"5\"}",
        'prov:generatedAtTime': '2019-09-17T16:40:04',
        'hubmap:groupName': 'hubmap-testing',
        'hubmap:userEmail': 'shirey@pitt.edu',
        'hubmap:userUUID': 'e19adbbb-73c3-43a7-b05e-0eead04f5ff8',
        'hubmap:groupUUID': '5bd084c8-edc2-11e8-802f-0e368f3075e8',
        'hubmap:modifiedTimestamp': '2019-09-17T16:40:04',
        'hubmap:userDisplayName': 'William Shirey',
      },
      'hubmap:entities/d2f87dda666fce9efeeeb09b078b5feb': {
        'prov:label': 'TEST0005-RK-3',
        'prov:type': 'Sample',
        'hubmap:doi': '479XQZH692',
        'hubmap:displayDOI': 'HBM:479-XQZH-692',
        'hubmap:displayIdentifier': 'TEST0005-RK-3',
        'hubmap:uuid': 'd2f87dda666fce9efeeeb09b078b5feb',
        'hubmap:metadata': "{\"protocols\": \"[{'id': 'protocol_1', 'protocol_url': 'http://protocols.io/protst/29022928394', 'protocol_file': ''}]\", \"specimen_type\": \"fresh_frozen_tissue\", \"user_group_uuid\": \"5bd084c8-edc2-11e8-802f-0e368f3075e8\", \"sample_count\": \"5\"}",
        'prov:generatedAtTime': '2019-09-17T16:40:04',
        'hubmap:groupName': 'hubmap-testing',
        'hubmap:userEmail': 'shirey@pitt.edu',
        'hubmap:userUUID': 'e19adbbb-73c3-43a7-b05e-0eead04f5ff8',
        'hubmap:groupUUID': '5bd084c8-edc2-11e8-802f-0e368f3075e8',
        'hubmap:modifiedTimestamp': '2019-09-17T16:40:04',
        'hubmap:userDisplayName': 'William Shirey',
      },
      'hubmap:entities/731c5b88cdc623212cf605d1ff6f22f7': {
        'prov:label': 'TEST0005-RK-2',
        'prov:type': 'Sample',
        'hubmap:doi': '876VBCH275',
        'hubmap:displayDOI': 'HBM:876-VBCH-275',
        'hubmap:displayIdentifier': 'TEST0005-RK-2',
        'hubmap:uuid': '731c5b88cdc623212cf605d1ff6f22f7',
        'hubmap:metadata': "{\"protocols\": \"[{'id': 'protocol_1', 'protocol_url': 'http://protocols.io/protst/29022928394', 'protocol_file': ''}]\", \"specimen_type\": \"fresh_frozen_tissue\", \"user_group_uuid\": \"5bd084c8-edc2-11e8-802f-0e368f3075e8\", \"sample_count\": \"5\"}",
        'prov:generatedAtTime': '2019-09-17T16:40:04',
        'hubmap:groupName': 'hubmap-testing',
        'hubmap:userEmail': 'shirey@pitt.edu',
        'hubmap:userUUID': 'e19adbbb-73c3-43a7-b05e-0eead04f5ff8',
        'hubmap:groupUUID': '5bd084c8-edc2-11e8-802f-0e368f3075e8',
        'hubmap:modifiedTimestamp': '2019-09-17T16:40:04',
        'hubmap:userDisplayName': 'William Shirey',
      },
      'hubmap:entities/51318fa4fff79c82d4de7b2d70e630cb': {
        'prov:label': 'TEST0005-RK-1',
        'prov:type': 'Sample',
        'hubmap:doi': '836PZMN835',
        'hubmap:displayDOI': 'HBM:836-PZMN-835',
        'hubmap:displayIdentifier': 'TEST0005-RK-1',
        'hubmap:uuid': '51318fa4fff79c82d4de7b2d70e630cb',
        'hubmap:metadata': "{\"protocols\": \"[{'id': 'protocol_1', 'protocol_url': 'http://protocols.io/protst/29022928394', 'protocol_file': ''}]\", \"specimen_type\": \"fresh_frozen_tissue\", \"user_group_uuid\": \"5bd084c8-edc2-11e8-802f-0e368f3075e8\", \"sample_count\": \"5\"}",
        'prov:generatedAtTime': '2019-09-17T16:40:04',
        'hubmap:groupName': 'hubmap-testing',
        'hubmap:userEmail': 'shirey@pitt.edu',
        'hubmap:userUUID': 'e19adbbb-73c3-43a7-b05e-0eead04f5ff8',
        'hubmap:groupUUID': '5bd084c8-edc2-11e8-802f-0e368f3075e8',
        'hubmap:modifiedTimestamp': '2019-09-17T16:40:04',
        'hubmap:userDisplayName': 'William Shirey',
      },
      'hubmap:entities/5822aa2f0e9e1e9b07731de97109ef6d': {
        'prov:label': 'TEST0005',
        'prov:type': 'Donor',
        'hubmap:doi': '434SQQX764',
        'hubmap:displayDOI': 'HBM:434-SQQX-764',
        'hubmap:displayIdentifier': 'TEST0005',
        'hubmap:uuid': '5822aa2f0e9e1e9b07731de97109ef6d',
        'hubmap:metadata': '{"description": "Test donor while demoing with Jeff.", "user_group_uuid": "5bd084c8-edc2-11e8-802f-0e368f3075e8", "protocol": "http://protocols.io/protst/29022928394"}',
        'prov:generatedAtTime': '2019-09-17T16:25:29',
        'hubmap:groupName': 'hubmap-testing',
        'hubmap:userEmail': 'shirey@pitt.edu',
        'hubmap:userUUID': 'e19adbbb-73c3-43a7-b05e-0eead04f5ff8',
        'hubmap:groupUUID': '5bd084c8-edc2-11e8-802f-0e368f3075e8',
        'hubmap:modifiedTimestamp': '2019-09-17T16:25:29',
        'hubmap:userDisplayName': 'William Shirey',
      },
    },
    wasGeneratedBy: {
      '_:id1': {
        'prov:entity': 'hubmap:entities/0817f6a3a2f170486a49f2ffae46072d',
        'prov:activity': 'hubmap:activities/822a66f8d498ef37fbc2280abcf56c9e',
      },
      '_:id2': {
        'prov:entity': 'hubmap:entities/12e77e69ab76b1832a95e00646f666db',
        'prov:activity': 'hubmap:activities/822a66f8d498ef37fbc2280abcf56c9e',
      },
      '_:id3': {
        'prov:entity': 'hubmap:entities/d2f87dda666fce9efeeeb09b078b5feb',
        'prov:activity': 'hubmap:activities/822a66f8d498ef37fbc2280abcf56c9e',
      },
      '_:id4': {
        'prov:entity': 'hubmap:entities/731c5b88cdc623212cf605d1ff6f22f7',
        'prov:activity': 'hubmap:activities/822a66f8d498ef37fbc2280abcf56c9e',
      },
      '_:id5': {
        'prov:entity': 'hubmap:entities/51318fa4fff79c82d4de7b2d70e630cb',
        'prov:activity': 'hubmap:activities/822a66f8d498ef37fbc2280abcf56c9e',
      },
      '_:id7': {
        'prov:entity': 'hubmap:entities/9942c58c009cb0a0f245f9cb61586af5',
        'prov:activity': 'hubmap:activities/d8db1999c29d32dd5960883be688983a',
      },
      '_:id9': {
        'prov:entity': 'hubmap:entities/5822aa2f0e9e1e9b07731de97109ef6d',
        'prov:activity': 'hubmap:activities/dd7a55a9a297ad308f6c48c3b7090475',
      },
    },
    activity: {
      'hubmap:activities/822a66f8d498ef37fbc2280abcf56c9e': {
        'prov:startTime': '2019-09-17T16:40:04',
        'prov:endTime': '2019-09-17T16:40:04',
        'prov:label': '822a66f8d498ef37fbc2280abcf56c9e',
        'prov:type': 'Create Sample Activity',
        'hubmap:doi': '982TNDD845',
        'hubmap:displayDOI': 'HBM:982-TNDD-845',
        'hubmap:displayIdentifier': '822a66f8d498ef37fbc2280abcf56c9e',
        'hubmap:uuid': '822a66f8d498ef37fbc2280abcf56c9e',
        'prov:generatedAtTime': '2019-09-17T16:40:04',
        'hubmap:groupName': 'hubmap-testing',
        'hubmap:userEmail': 'shirey@pitt.edu',
        'hubmap:userUUID': 'e19adbbb-73c3-43a7-b05e-0eead04f5ff8',
        'hubmap:groupUUID': '5bd084c8-edc2-11e8-802f-0e368f3075e8',
        'hubmap:modifiedTimestamp': '2019-09-17T16:40:04',
        'hubmap:userDisplayName': 'William Shirey',
      },
      'hubmap:activities/d8db1999c29d32dd5960883be688983a': {
        'prov:startTime': '2019-09-17T16:32:06',
        'prov:endTime': '2019-09-17T16:32:06',
        'prov:label': 'd8db1999c29d32dd5960883be688983a',
        'prov:type': 'Create Sample Activity',
        'hubmap:doi': '728KSNQ584',
        'hubmap:displayDOI': 'HBM:728-KSNQ-584',
        'hubmap:displayIdentifier': 'd8db1999c29d32dd5960883be688983a',
        'hubmap:uuid': 'd8db1999c29d32dd5960883be688983a',
        'prov:generatedAtTime': '2019-09-17T16:32:06',
        'hubmap:groupName': 'hubmap-testing',
        'hubmap:userEmail': 'shirey@pitt.edu',
        'hubmap:userUUID': 'e19adbbb-73c3-43a7-b05e-0eead04f5ff8',
        'hubmap:groupUUID': '5bd084c8-edc2-11e8-802f-0e368f3075e8',
        'hubmap:modifiedTimestamp': '2019-09-17T16:32:06',
        'hubmap:userDisplayName': 'William Shirey',
      },
      'hubmap:activities/dd7a55a9a297ad308f6c48c3b7090475': {
        'prov:startTime': '2019-09-17T16:25:29',
        'prov:endTime': '2019-09-17T16:25:29',
        'prov:label': 'dd7a55a9a297ad308f6c48c3b7090475',
        'prov:type': 'Register Donor Activity',
        'hubmap:doi': '893BBGB538',
        'hubmap:displayDOI': 'HBM:893-BBGB-538',
        'hubmap:displayIdentifier': 'dd7a55a9a297ad308f6c48c3b7090475',
        'hubmap:uuid': 'dd7a55a9a297ad308f6c48c3b7090475',
        'prov:generatedAtTime': '2019-09-17T16:25:29',
        'hubmap:groupName': 'hubmap-testing',
        'hubmap:userEmail': 'shirey@pitt.edu',
        'hubmap:userUUID': 'e19adbbb-73c3-43a7-b05e-0eead04f5ff8',
        'hubmap:groupUUID': '5bd084c8-edc2-11e8-802f-0e368f3075e8',
        'hubmap:modifiedTimestamp': '2019-09-17T16:25:29',
        'hubmap:userDisplayName': 'William Shirey',
      },
    },
    used: {
      '_:id6': {
        'prov:activity': 'hubmap:activities/822a66f8d498ef37fbc2280abcf56c9e',
        'prov:entity': 'hubmap:entities/9942c58c009cb0a0f245f9cb61586af5',
      },
      '_:id8': {
        'prov:activity': 'hubmap:activities/d8db1999c29d32dd5960883be688983a',
        'prov:entity': 'hubmap:entities/5822aa2f0e9e1e9b07731de97109ef6d',
      },
      '_:id10': {
        'prov:activity': 'hubmap:activities/dd7a55a9a297ad308f6c48c3b7090475',
        'prov:entity': 'hubmap:entities/5bd084c8-edc2-11e8-802f-0e368f3075e8',
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
          name: 'TEST0005-RK',
          source: [],
        },
      ],
      name: '822a66f8d498ef37fbc2280abcf56c9e',
      outputs: [
        {
          meta: {
            global: true,
          },
          name: 'TEST0005-RK-1',
          target: [
            {
              name: 'TEST0005-RK-1',
            },
          ],
        },
      ],
    },
    {
      inputs: [
        {
          meta: {
            global: true,
          },
          name: 'TEST0005',
          source: [],
        },
      ],
      name: 'd8db1999c29d32dd5960883be688983a',
      outputs: [
        {
          meta: {
            global: true,
          },
          name: 'TEST0005-RK',
          target: [
            {
              name: 'TEST0005-RK',
            },
          ],
        },
      ],
    },
  ],
};

// The demos reference the default export:
// Update this to update all the demos.
export default real;
