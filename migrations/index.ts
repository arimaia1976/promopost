import * as migration_20261106_223005_inicial from './20261106_223005_inicial';

export const migrations = [
  {
    up: migration_20261106_223005_inicial.up,
    down: migration_20261106_223005_inicial.down,
    name: '20261106_223005_inicial'
  },
];
