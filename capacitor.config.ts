import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // TODO configure appId and appName before building app
  appId: 'com.example.esistere',
  appName: 'esistere',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
