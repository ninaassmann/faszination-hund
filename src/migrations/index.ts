import * as migration_20260113_121241 from './20260113_121241';

export const migrations = [
  {
    up: migration_20260113_121241.up,
    down: migration_20260113_121241.down,
    name: '20260113_121241'
  },
];
