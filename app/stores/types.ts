// Candidate-only
export type UserType = 'candidate';

export type OtpTargetType = 'email' | 'phone';

export interface ApiEnvelope<TData = unknown> {
  success?: boolean;
  message?: string;
  data?: TData;
  [key: string]: any;
}

export type MaybeApiEnvelope<TData> = TData | ApiEnvelope<TData>;

export interface OtpCredentialEmail {
  type: 'email';
  email: string;
}

export interface OtpCredentialPhone {
  type: 'phone';
  phone: string;
  countryCode: string | null;
}

export type OtpCredential = OtpCredentialEmail | OtpCredentialPhone;

export interface OtpRequestPayload {
  target: string;
  targetType: OtpTargetType;
  countryCode?: string;
}

export interface SendOtpParams {
  target: string;
  targetType?: OtpTargetType;
  countryCode?: string;
  // userType no longer needed here, always 'candidate'
}

export type SendOtpResult = { ok: boolean; message?: string };

export interface VerifyOtpData {
  isNewCredential: boolean;
  userId: string;
  profileId: string;
}

export type VerifyOtpResult =
  | { ok: true; data: VerifyOtpData }
  | { ok: false; message?: string };

export interface AuthState {
  user: Record<string, any> | null;
  userType: UserType;              // always 'candidate'
  otpCredential: OtpCredential | null;
  otpRequestPayload: OtpRequestPayload | null;
  otpSending: boolean;
  otpError: string | null;
  otpLastSentAt: number | null;
}

export interface AuthStoreActions {
  setOtpCredential: (value: OtpCredential | null) => void;
  setOtpError: (value: string | null) => void;
  setUser: (user: Record<string, any> | null) => void;
  setUserType: (userType: UserType) => void; // if you even still need it
  sendOtp: (params: SendOtpParams) => Promise<SendOtpResult>;
  verifyOtp: (code: string) => Promise<VerifyOtpResult>; // no userType param
}

export type AuthStore = AuthState & AuthStoreActions;
