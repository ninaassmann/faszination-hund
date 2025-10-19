import * as migration_20251019_111216 from './20251019_111216';

export const migrations = [
  {
    up: migration_20251019_111216.up,
    down: migration_20251019_111216.down,
    name: '20251019_111216'
  },
];
