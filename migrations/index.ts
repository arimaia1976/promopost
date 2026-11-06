import * as migration_20261106_222102_inicial from './20261106_222102_inicial';

export const migrations = [
  {
    up: migration_20261106_222102_inicial.up,
    down: migration_20261106_222102_inicial.down,
    name: '20261106_222102_inicial'
  },
];
