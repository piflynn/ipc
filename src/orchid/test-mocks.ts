export const mockUserSession = {
  expiresIn: 999999,
  href: 'https://orchid.ipconfigure.com/service/sessions/zNZ1Fu9PcV3advU',
  id: 'zNZ1Fu9PcV3advU',
  name: 'liveviewer',
  owner: {
    href: 'https://orchid.ipconfigure.com/service/users/241',
    id: 241,
  },
  role: 'Live Viewer',
  scope: {
    baseScope: ['live'],
    cameraScopes: [],
  },
  type: 'user',
  userId: '241',
};

export const mockSessionId = 'mockSessionId';

export const mockStreamId = 12345;

export const mockStreams = [
  {
    active: true,
    camera: {
      capabilities: {
        camera: {
          DHCP: {
            capabilities: {
              Off: {
                HostName: {
                  max: '63',
                  type: 'string',
                },
                IPAddress: {
                  type: 'ip_address',
                },
                NetworkGateway: {
                  type: 'ip_address',
                },
                SubnetMask: {
                  type: 'ip_address',
                },
              },
              On: {
                IPAddress: {
                  readOnly: 'true',
                  type: 'ip_address',
                },
              },
            },
            options: ['On', 'Off'],
            type: 'enum',
          },
          NTP: {
            Mode: {
              capabilities: {
                manual: {
                  Server: {
                    default: 'pool.ntp.org',
                    type: 'string',
                  },
                },
              },
              default: 'disabled',
              options: ['disabled', 'dhcp', 'manual'],
              type: 'enum',
            },
          },
          PTZ: {
            maxPresets: '0',
            pan: 'true',
            relativeFOV: 'true',
            tilt: 'true',
            zoom: 'false',
          },
          PossibleStreams: '40',
          TimeZone: {
            DaylightSavings: {
              default: 'false',
              options: ['true', 'false'],
              type: 'enum',
            },
            PosixTZ: {
              default: 'UTC0',
              type: 'posix_tz_string',
            },
          },
          TransportProtocol: {
            default: 'AUTO',
            options: ['AUTO', 'UDP', 'UDP_MCAST', 'HTTP', 'TCP'],
            type: 'enum',
          },
        },
      },
      href: 'https://orchid.ipconfigure.com/service/cameras/424',
      id: 424,
    },
    configuration: {
      Audio: {
        Encoder: 'none',
      },
      Fixed: 'true',
      Metadata: {
        Mode: 'On',
        TopicFilter: [],
      },
      Name: 'profile_0 h264',
      ONVIF: {
        MetadataConfigurationToken: '0',
        ProfileToken: 'profile_0_h264',
        VideoEncoderConfigurationToken: 'default_0_h264',
        VideoEncoderMulticastAddress: '0.0.0.0',
        VideoEncoderMulticastPort: '0',
      },
      Options: 'none',
      Resource:
        'rtsp://192.168.222.112/onvif-media/media.amp?profile=profile_0_h264&sessiontimeout=60&streamtype=unicast',
      Video: {
        BitRate: '10000',
        Encoder: 'H264',
        EncoderInterval: '1',
        FrameRate: '30',
        GOVLength: '30',
        Profile: 'Main',
        Quality: '100',
        Resolution: '2048x2048',
      },
    },
    dewarpConfiguration: {
      defaultMode: 'perspective',
      defaultPerspectiveView: {
        pan: '0',
        tilt: '45',
        zoom: '0.5',
      },
      enable: 'true',
      orientation: 'ceiling',
      panoramaAspectRatio: '3',
      panoramaShift: '23',
      perspectiveDepth: '1.1000000000000001',
    },
    href: 'https://orchid.ipconfigure.com/service/streams/2628',
    id: 2628,
    name: 'profile_1 h264',
    recordWhenSecondary: false,
    recordingConfiguration: {
      bgseg: {
        boxArea: '11',
        dilate: '10',
        motionMask: {
          href: '',
        },
        postErode: '2',
        preErode: '2',
        threshold: '25',
      },
      decode: {
        keyFramesOnly: 'true',
      },
      filesplit: {
        motionMode: '0',
        recordState: 'true',
      },
      mode: 'ALL_FEATURES_MODE',
      motionReducer: 'false',
    },
  },
];

export const mockFrame = new Blob();
