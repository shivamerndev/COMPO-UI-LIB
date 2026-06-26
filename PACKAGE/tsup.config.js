import { defineConfig } from 'tsup';
import React from 'react';


export default defineConfig({
    entry: ['src/index.js'],
    format: ['cjs', 'esm'],
    dts: false,
    clean: true,
    external: ['react']
});