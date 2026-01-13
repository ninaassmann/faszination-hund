import * as migration_20251019_111216 from './20251019_111216';
import * as migration_20260109_200024 from './20260109_200024';
import * as migration_20260113_111125 from './20260113_111125';

export const migrations = [
  {
    up: migration_20251019_111216.up,
    down: migration_20251019_111216.down,
    name: '20251019_111216',
  },
  {
    up: migration_20260109_200024.up,
    down: migration_20260109_200024.down,
    name: '20260109_200024',
  },
  {
    up: migration_20260113_111125.up,
    down: migration_20260113_111125.down,
    name: '20260113_111125'
  },
];
