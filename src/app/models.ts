export interface UserSession {
    type: string;
    id: string;
    href: string;
    name: string;
    role: string;
    scope: unknown;
    owner: unknown;
    expiresIn: number;
    userId: string;
  }


  export interface StreamsResponse {
    href: string;
    streams: Stream[];
  }
  
  interface Stream {
    active: boolean;
    camera: unknown;
    configuration: unknown;
    dewarpConfiguration: unknown;
    href: string;
    id: number;
    name: string;
    recordWhenSecondary: boolean;
    recordingConfiguration: unknown;
  }

  export interface DisplayImage {
    name: string;
    url: string;
  }

  export interface StreamBlob {
    stream: Stream;
    blob: Blob;
  }
  
  
