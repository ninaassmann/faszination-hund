import * as migration_20250909_160945_initial from './20250909_160945_initial';
import * as migration_20251019_093750 from './20251019_093750';

export const migrations = [
  {
    up: migration_20250909_160945_initial.up,
    down: migration_20250909_160945_initial.down,
    name: '20250909_160945_initial',
  },
  {
    up: migration_20251019_093750.up,
    down: migration_20251019_093750.down,
    name: '20251019_093750'
  },
];
