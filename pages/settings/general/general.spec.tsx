jest.mock('@/utils/media');
jest.mock('@/utils/device');

import { shallow, mount } from 'enzyme';
import toJSON, { shallowToJson } from 'enzyme-to-json';

import { mockSettings, mockAppVersion } from '@/mocks';
import { mediaQuery } from '@/utils/media';

import GeneralView from './view';
import { General } from './';
import {
  ProvProfile,
  Certificate,
  KeystoreFile,
  ServiceAccountJsonFile,
  IosSettings,
  AndroidSettings,
  Settings
} from '@/models/settings';

describe('GeneralView', () => {
  const defaultProps = {
    appSlug: mockAppVersion.appSlug,
    maximumNumberOfCertificates: 30,
    appVersion: mockAppVersion,
    iosWorkflow: '',
    androidWorkflow: '',
    iosSettings: mockSettings.iosSettings,
    androidSettings: mockSettings.androidSettings,
    provProfiles: mockSettings.provProfiles,
    certificates: mockSettings.certificates,
    keystoreFiles: mockSettings.keystoreFiles,
    serviceAccountJsonFiles: mockSettings.serviceAccountJsonFiles,
    hasMounted: true,
    onSettingsPropertyChange: jest.fn(),
    onSelectedFileChange: jest.fn(),
    onWorkflowChange: jest.fn(),
    onCancel: jest.fn(),
    onSave: jest.fn(),
    hasIosSettings: true,
    hasAndroidSettings: true,
    hasLoaded: true
  };

  describe('when viewed on desktop', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);
    });

    it('renders the view correctly', () => {
      const tree = toJSON(shallow(<GeneralView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });

    it('renders the loading state', () => {
      const tree = toJSON(shallow(<GeneralView {...defaultProps} hasLoaded={false} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when viewed on mobile', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([false]);
    });

    it('renders the view correctly', () => {
      const tree = toJSON(shallow(<GeneralView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when there are no iOS settings', () => {
    it('does not render iOS settings section', () => {
      const tree = toJSON(
        shallow(
          <GeneralView
            {...defaultProps}
            iosSettings={undefined}
            hasIosSettings={false}
            provProfiles={undefined}
            certificates={undefined}
          />
        )
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when there are no Android settings', () => {
    it('does not render Android settings section', () => {
      const tree = toJSON(
        shallow(
          <GeneralView
            {...defaultProps}
            androidSettings={undefined}
            hasAndroidSettings={false}
            keystoreFiles={undefined}
            serviceAccountJsonFiles={undefined}
          />
        )
      );
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when there are no files', () => {
    it('renders no files section', () => {
      const tree = toJSON(
        shallow(
          <GeneralView
            {...defaultProps}
            provProfiles={[]}
            certificates={[]}
            keystoreFiles={[]}
            serviceAccountJsonFiles={[]}
          />
        )
      );
      expect(tree).toMatchSnapshot();
    });
  });

  ([
    ['ProvProfile', mockSettings.provProfiles, [], [], [], mockSettings.provProfiles],
    ['Certificate', [], mockSettings.certificates, [], [], mockSettings.certificates],
    ['KeystoreFile', [], [], mockSettings.keystoreFiles, [], mockSettings.keystoreFiles],
    ['ServiceAccountJsonFile', [], [], [], mockSettings.serviceAccountJsonFiles, mockSettings.serviceAccountJsonFiles]
  ] as any).forEach(
    ([fileType, provProfiles, certificates, keystoreFiles, serviceAccountJsonFiles, selectables]: [
      string,
      ProvProfile[],
      Certificate[],
      KeystoreFile[],
      ServiceAccountJsonFile[],
      any[]
    ]) => {
      describe('when a file is selected', () => {
        it('calls onSelectedFileChange with the file type and the file itself', () => {
          const mockOnSelectedFileChange = jest.fn() as any;
          const tree = mount(
            <GeneralView
              {...defaultProps}
              provProfiles={provProfiles}
              certificates={certificates}
              keystoreFiles={keystoreFiles}
              serviceAccountJsonFiles={serviceAccountJsonFiles}
              onSelectedFileChange={mockOnSelectedFileChange}
            />
          );

          tree.find('input[type="radio"]').forEach((radioInput, index) => {
            radioInput.simulate('change', { target: { checked: true } });

            expect(mockOnSelectedFileChange).toHaveBeenCalledWith(fileType, selectables[index]);
          });
        });
      });
    }
  );

  [
    ['appSku', 'iosSettings'],
    ['appleDeveloperAccountEmail', 'iosSettings'],
    ['appSpecificPassword', 'iosSettings'],
    ['track', 'androidSettings']
  ].forEach(([inputName, settings]) => {
    describe(`when input ${inputName} is changing`, () => {
      it(`calls onSettingsPropertyChange with ${settings}, ${inputName} and the new value`, () => {
        const mockOnSettingsPropertyChange = jest.fn() as any;
        const tree = mount(<GeneralView {...defaultProps} onSettingsPropertyChange={mockOnSettingsPropertyChange} />);

        tree
          .find(`input[name="${inputName}"]`)
          .last()
          .simulate('change', { target: { value: 'something' } });

        expect(mockOnSettingsPropertyChange).toHaveBeenCalledWith(settings, inputName, 'something');
      });
    });
  });

  test('when includeBitCode is changed', () => {
    const mockOnSettingsPropertyChange = jest.fn() as any;
    const tree = mount(<GeneralView {...defaultProps} onSettingsPropertyChange={mockOnSettingsPropertyChange} />);

    tree
      .find(`input[name="includeBitCode"]`)
      .last()
      .simulate('change', { target: { checked: true } });

    expect(mockOnSettingsPropertyChange).toHaveBeenCalledWith('iosSettings', 'includeBitCode', true);
  });

  test('when the settings are being saved', () => {
    const tree = shallowToJson(shallow(<GeneralView {...defaultProps} isSaving />));
    expect(tree).toMatchSnapshot();
  });
});

describe('General', () => {
  const defaultProps = {
    appSlug: 'some-app-slug',
    appVersion: mockAppVersion,
    settings: mockSettings,
    updateSettings: jest.fn() as any,
    fetchSettings: jest.fn() as any,
    hasLoaded: true
  };

  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<General {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when loading', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<General {...defaultProps} hasLoaded={false} />));
    expect(tree).toMatchSnapshot();
  });

  describe('configureSettingsFromProps', () => {
    it('sets the state correctly for ios', () => {
      const settings: Settings = { ...mockSettings, projectType: 'ios' };
      const wrapper = shallow(<General {...defaultProps} settings={settings} />);
      expect(wrapper.state()).toMatchSnapshot();
    });

    it('sets the state correctly for android', () => {
      const settings: Settings = { ...mockSettings, projectType: 'android' };
      const wrapper = shallow(<General {...defaultProps} settings={settings} />);
      expect(wrapper.instance().state).toMatchSnapshot();
    });

    it('sets the state correctly for other project types', () => {
      const settings: Settings = { ...mockSettings, projectType: 'other' };
      const wrapper = shallow(<General {...defaultProps} settings={settings} />);
      expect(wrapper.state()).toMatchSnapshot();
    });
  });

  test('onSettingsPropertyChange', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const wrapper = shallow(<General {...defaultProps} />);

    (wrapper.instance() as General).onSettingsPropertyChange('iosSettings', 'appSku', 'some-vlaue');

    expect(wrapper.state()).toMatchSnapshot();
    expect(wrapper.state('hasModifications')).toBe(true);
  });

  it('triggers a save', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const mockUpdateSettings = jest.fn() as any;
    const tree = mount(<General {...defaultProps} updateSettings={mockUpdateSettings} />);

    tree
      .find('input[name="iosWorkflow"]')
      .first()
      .simulate('change', { target: { value: 'Primary' } });

    tree
      .find('button')
      .last()
      .simulate('click');

    expect(mockUpdateSettings).toHaveBeenCalled();
  });

  it('triggers a state update when a form item is modified for ios', () => {
    const tree = mount(<General {...defaultProps} />);

    tree
      .find('input[name="iosWorkflow"]')
      .first()
      .simulate('change', { target: { value: 'Primary' } });

    expect(tree.state('iosWorkflow')).toEqual('Primary');
    expect(tree.state('hasModifications')).toBe(true);
  });

  it('triggers a state update when a form item is modified for android', () => {
    const tree = mount(<General {...defaultProps} />);

    tree
      .find('input[name="androidWorkflow"]')
      .first()
      .simulate('change', { target: { value: 'Primary' } });

    expect(tree.state('androidWorkflow')).toEqual('Primary');
    expect(tree.state('hasModifications')).toBe(true);
  });

  it('triggers a state reset when cancel is selected', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = mount(<General {...defaultProps} />);

    tree
      .find('input[name="iosWorkflow"]')
      .first()
      .simulate('change', { target: { value: 'Primary' } });
    tree
      .find('button')
      .first()
      .simulate('click');

    expect(tree.state('iosWorkflow')).toEqual(mockSettings.iosWorkflow);
  });

  it('triggers a state update when selected prov profile changes', () => {
    const selectedProvProfile = (mockSettings.provProfiles as ProvProfile[])[1];

    const tree = shallow(<General {...defaultProps} />);
    (tree.instance() as General).toggleProvProfile(selectedProvProfile.slug);

    expect((tree.state('iosSettings') as IosSettings).selectedAppStoreProvisioningProfiles).toEqual([
      ...defaultProps.settings.iosSettings!.selectedAppStoreProvisioningProfiles,
      selectedProvProfile.slug
    ]);
    expect(tree.state('hasModifications')).toBe(true);
  });

  it('triggers a state update when selected certificate changes', () => {
    const selectedCertificate = (mockSettings.certificates as Certificate[])[0];

    const tree = shallow(<General {...defaultProps} />);
    (tree.instance() as General).onSelectedFileChange('Certificate', selectedCertificate);

    expect((tree.state('iosSettings') as IosSettings).selectedCodeSigningIdentity).toEqual(selectedCertificate.slug);
    expect(tree.state('hasModifications')).toBe(true);
  });

  it('triggers a state update when selected keystore file changes', () => {
    const selectedKeystoreFile = (mockSettings.keystoreFiles as KeystoreFile[])[1];

    const tree = shallow(<General {...defaultProps} />);
    (tree.instance() as General).onSelectedFileChange('KeystoreFile', selectedKeystoreFile);

    expect((tree.state('androidSettings') as AndroidSettings).selectedKeystoreFile).toEqual(selectedKeystoreFile.slug);
    expect(tree.state('hasModifications')).toBe(true);
  });

  it('triggers a state update when selected service account JSON file changes', () => {
    const selectedServiceAccountJsonFile = (mockSettings.serviceAccountJsonFiles as ServiceAccountJsonFile[])[0];

    const tree = shallow(<General {...defaultProps} />);
    (tree.instance() as General).onSelectedFileChange('ServiceAccountJsonFile', selectedServiceAccountJsonFile);

    expect((tree.state('androidSettings') as AndroidSettings).selectedServiceAccount).toEqual(
      selectedServiceAccountJsonFile.slug
    );
    expect(tree.state('hasModifications')).toBe(true);
  });
});
