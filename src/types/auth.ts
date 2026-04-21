export interface RegisterBody {
  orgDetails: {
    name: string;
    legalName: string;
    contactInfo: {
      email: string;
      phone: string;
    };
  };
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface ApiResponse {
  accessToken: string;
}

export interface userDetailsData {
  data: {
    mfa: {
      totpEnabled: boolean;
      totpVerified: boolean;
      passkeyEnabled: boolean;
      backupCodes: string[];
      passkeys: any[];
    };
    _id: string;
    name: string;
    email: string;
    orgId: {
      _id: string;
      name: string;
      orgId: string;
    };
    role: string;
    enabled: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}