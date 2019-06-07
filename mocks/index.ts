import { AppVersion } from '@/models';
import { TestDevice } from '@/models/test-device';

export const mockAppVersions: AppVersion[] = [
  {
    id: 123,
    appSlug: 'app-slug-123',
    version: '1.0.3',
    platform: 'ios',
    buildNumber: 32,
    buildSlug: '13245ads',
    lastUpdate: new Date('2018-09-22T12:42:31Z'),
    description: 'Some semi-long description',
    whatsNew: 'Some longer whats-new',
    minimumOs: '10.2',
    minimumSdk: 'dunno',
    packageName: 'com.package.name',
    certificateExpires: new Date('2018-09-22T12:42:31Z'),
    bundleId: 'bundle-id',
    size: 4567034,
    supportedDeviceTypes: ['iphone', 'ipad'],
    distributionType: 'development',
    iconUrl: 'http://placekitten.com/160/160',
    appName: 'Standup Timer',
    promotionalText: 'Promotional Text',
    keywords: 'Keywords',
    reviewNotes: 'Review Notes',
    supportUrl: 'https://bitrise.io/support',
    marketingUrl: 'https://bitrise.io/marketing',
    scheme: 'piramid',
    configuration: 'canary',
    publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276'
  },
  {
    id: 456,
    appSlug: 'app-slug-456',
    version: '1.0.3',
    platform: 'ios',
    buildNumber: 31,
    buildSlug: '13245ads',
    lastUpdate: new Date('2018-09-22T12:42:31Z'),
    description: 'Some semi-long description',
    whatsNew: 'Some longer whats-new',
    minimumOs: '10.2',
    minimumSdk: 'dunno',
    packageName: 'com.package.name',
    certificateExpires: new Date('2018-09-21T12:42:31Z'),
    bundleId: 'bundle-id',
    size: 4567034,
    supportedDeviceTypes: ['iphone', 'ipad'],
    distributionType: 'development',
    iconUrl: 'http://placekitten.com/160/160',
    appName: 'Standup Timer',
    promotionalText: 'Promotional Text',
    keywords: 'Keywords',
    reviewNotes: 'Review Notes',
    supportUrl: 'https://bitrise.io/support',
    marketingUrl: 'https://bitrise.io/marketing',
    scheme: 'piramid',
    configuration: 'canary',
    publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276'
  },
  {
    id: 789,
    appSlug: 'app-slug-789',
    version: '1.0.3',
    platform: 'ios',
    buildNumber: 30,
    buildSlug: '13245ads',
    lastUpdate: new Date('2018-09-22T12:42:31Z'),
    description: 'Some semi-long description',
    whatsNew: 'Some longer whats-new',
    minimumOs: '10.2',
    minimumSdk: 'dunno',
    packageName: 'com.package.name',
    certificateExpires: new Date('2018-09-20T12:42:31Z'),
    bundleId: 'bundle-id',
    size: 4567034,
    supportedDeviceTypes: ['iphone', 'ipad'],
    distributionType: 'development',
    iconUrl: 'http://placekitten.com/160/160',
    appName: 'Standup Timer',
    promotionalText: 'Promotional Text',
    keywords: 'Keywords',
    reviewNotes: 'Review Notes',
    supportUrl: 'https://bitrise.io/support',
    marketingUrl: 'https://bitrise.io/marketing',
    scheme: 'piramid',
    configuration: 'canary',
    publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276'
  },
  {
    id: 135,
    appSlug: 'app-slug-135',
    version: '1.0.2',
    platform: 'ios',
    buildNumber: 29,
    buildSlug: '13245ads',
    lastUpdate: new Date('2018-09-22T12:42:31Z'),
    description: 'Some semi-long description',
    whatsNew: 'Some longer whats-new',
    minimumOs: '10.2',
    minimumSdk: 'dunno',
    packageName: 'com.package.name',
    certificateExpires: new Date('2018-09-29T12:42:31Z'),
    bundleId: 'bundle-id',
    size: 4567034,
    supportedDeviceTypes: ['iphone', 'ipad'],
    distributionType: 'development',
    iconUrl: 'http://placekitten.com/160/160',
    appName: 'Standup Timer',
    promotionalText: 'Promotional Text',
    keywords: 'Keywords',
    reviewNotes: 'Review Notes',
    supportUrl: 'https://bitrise.io/support',
    marketingUrl: 'https://bitrise.io/marketing',
    scheme: 'piramid',
    configuration: 'canary',
    publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276'
  },
  {
    id: 246,
    appSlug: 'app-slug-246',
    version: '1.0.2',
    platform: 'ios',
    buildNumber: 28,
    buildSlug: '13245ads',
    lastUpdate: new Date('2018-09-22T12:42:31Z'),
    description: 'Some semi-long description',
    whatsNew: 'Some longer whats-new',
    minimumOs: '10.2',
    minimumSdk: 'dunno',
    packageName: 'com.package.name',
    certificateExpires: new Date('2018-09-28:42:31Z'),
    bundleId: 'bundle-id',
    size: 4567034,
    supportedDeviceTypes: ['iphone', 'ipad'],
    distributionType: 'development',
    iconUrl: 'http://placekitten.com/160/160',
    appName: 'Standup Timer',
    promotionalText: 'Promotional Text',
    keywords: 'Keywords',
    reviewNotes: 'Review Notes',
    supportUrl: 'https://bitrise.io/support',
    marketingUrl: 'https://bitrise.io/marketing',
    scheme: 'piramid',
    configuration: 'canary',
    publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276'
  }
];

export const mockAppVersion = mockAppVersions[0];
export const mockAppVersionWithoutPublicPage = {
  id: 123,
  appSlug: 'app-slug-123',
  version: '1.0.3',
  platform: 'ios',
  buildNumber: 32,
  buildSlug: '13245ads',
  lastUpdate: new Date('2018-09-22T12:42:31Z'),
  description: 'Some semi-long description',
  whatsNew: 'Some longer whats-new',
  minimumOs: '10.2',
  minimumSdk: 'dunno',
  packageName: 'com.package.name',
  certificateExpires: new Date('2018-09-22T12:42:31Z'),
  bundleId: 'bundle-id',
  size: 4567034,
  supportedDeviceTypes: ['iphone', 'ipad'],
  distributionType: 'development',
  iconUrl: 'http://placekitten.com/160/160',
  appName: 'Standup Timer',
  promotionalText: 'Promotional Text',
  keywords: 'Keywords',
  reviewNotes: 'Review Notes',
  supportUrl: 'https://bitrise.io/support',
  marketingUrl: 'https://bitrise.io/marketing',
  scheme: 'piramid',
  configuration: 'canary',
  publicInstallPageURL: undefined
};

export const mockTestDevices: TestDevice[] = [
  { deviceId: 'some-device-id-01', deviceType: 'ios', owner: 'test-user-1' },
  { deviceId: 'some-device-id-02', deviceType: 'android', owner: 'test-user-1' },
  { deviceId: 'some-device-id-03', deviceType: 'ios', owner: 'test-user-2' }
];
