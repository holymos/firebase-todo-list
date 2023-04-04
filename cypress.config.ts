import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';
import admin from 'firebase-admin';

export default defineConfig({
  e2e: {
    baseUrl: 'https://todo-list-c3e3b.web.app',
    setupNodeEvents(on, config) {
      return cypressFirebasePlugin(on, config, admin);
    },
    env: {
      hideCredentials: true,
    },
  },
  fixturesFolder: false,
  video: false,
});
