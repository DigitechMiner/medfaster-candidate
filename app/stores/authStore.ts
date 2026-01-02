'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useApiStore } from './apiStore';
import { ENDPOINTS } from '@/api/endpoints';
import {
  AuthState,
  AuthStore,
  OtpCredential,
  OtpRequestPayload,
  VerifyOtpResult,
  ApiEnvelope,
  VerifyOtpData,
  UserType,
} from './types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_COUNTRY_CODE = '1';

// 🎯 NEW: E.164 formatter for backend
const formatPhoneE164 = (phone: string, countryCode: string = '91'): string => {
  const clean = phone.replace(/\D/g, '');
  if (/^[6789]\d{9}$/.test(clean)) return `+${countryCode}${clean}`;
  return phone.startsWith('+') ? phone : `+${countryCode}${clean}`;
};

const OTP_ERROR_MESSAGES: Record<string, string> = {
  '429': 'Too many OTP requests. Please try again later.',
  '400': 'Invalid request. Please check your input.',
  '404': 'User not found.',
  default: 'Something went wrong. Please try again.',
};

const resolveStatusMessage = (status: number | undefined, messages: Record<string, string>) => {
  if (status !== undefined) {
    const mapped = messages[String(status)];
    if (mapped) return mapped;
  }
  return messages.default;
};

const isHttpSuccess = (status: number) => status >= 200 && status < 300;

const isApiEnvelope = <T>(payload: unknown): payload is ApiEnvelope<T> =>
  Boolean(
    payload &&
      typeof payload === 'object' &&
      ('success' in (payload as any) || 'message' in (payload as any))
  );

const extractPayload = <T>(payload: any): T => {
  if (isApiEnvelope<T>(payload)) {
    const envelope = payload as ApiEnvelope<T>;
    if (envelope.data !== undefined) {
      return envelope.data as T;
    }
    const { success, message, data, ...rest } = envelope as any;
    return rest as unknown as T;
  }
  return payload;
};

const initialState: AuthState = {
  user: null,
  userType: 'candidate',
  otpCredential: null,
  otpRequestPayload: null,
  otpSending: false,
  otpError: null,
  otpLastSentAt: null,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setOtpCredential: (value) => set({ otpCredential: value }),
      setOtpError: (value) => set({ otpError: value }),
      setUser: (user) => set({ user }),
      setUserType: (userType: UserType) => set({ userType }),

      sendOtp: async ({ target, targetType, countryCode }) => {
        set({ otpSending: true, otpError: null });

        try {
          const resolvedType = targetType ?? (EMAIL_REGEX.test(target) ? 'email' : 'phone');
          const resolvedCountryCode =
            resolvedType === 'phone' ? countryCode || DEFAULT_COUNTRY_CODE : undefined;

          // 🎯 FIX: Backend expects E.164 phone (NO country_code)
          const apiPayload = resolvedType === 'email'
            ? { email: target }
            : { phone: formatPhoneE164(target, resolvedCountryCode || '91') };  // +917098765432

          const responseData = await useApiStore.getState().post(
            ENDPOINTS.CANDIDATE.SEND_OTP,
            apiPayload
          );
          const response = responseData.data as ApiEnvelope;

          if (!response?.success) {
            const errorMessage =
              response?.message || resolveStatusMessage(responseData.status, OTP_ERROR_MESSAGES);
            set({ otpError: errorMessage });
            return { ok: false, message: errorMessage };
          }

          const credential: OtpCredential = resolvedType === 'email'
            ? { type: 'email', email: target }
            : { type: 'phone', phone: apiPayload.phone as string, countryCode: resolvedCountryCode ?? null };

          const payload: OtpRequestPayload = {
            target,
            targetType: resolvedType,
            countryCode: resolvedType === 'phone' ? resolvedCountryCode : undefined,
          };

          set({
            otpCredential: credential,
            otpRequestPayload: payload,
            otpLastSentAt: Date.now(),
            userType: 'candidate',
          });

          return { ok: true, message: response.message || 'OTP sent successfully' };
        } catch (error: any) {
          const fallbackMessage = resolveStatusMessage(error.statusCode, OTP_ERROR_MESSAGES);
          set({ otpError: fallbackMessage });
          return { ok: false, message: fallbackMessage };
        } finally {
          set({ otpSending: false });
        }
      },

      verifyOtp: async (code: string): Promise<VerifyOtpResult> => {
        const { otpCredential } = get();

        if (!otpCredential) {
          return { ok: false, message: 'OTP session expired. Please resend the code.' };
        }

        // 🎯 FIX: Backend expects E.164 phone (NO country_code)
        const payload = otpCredential.type === 'email'
          ? { email: otpCredential.email, otp: code }
          : { phone: otpCredential.phone, otp: code };  // E.164 format

        try {
          const res = await useApiStore.getState().post(
            ENDPOINTS.CANDIDATE.VALIDATE_OTP,
            payload
          );
          const json = res.data as ApiEnvelope<VerifyOtpData>;
          const success =
            typeof json?.success === 'boolean' ? json.success : isHttpSuccess(res.status);

          if (!success || !json?.data) {
            return { ok: false, message: json?.message || 'Invalid OTP' };
          }

          // Backend sets cookies; track userType in memory
          set({ userType: 'candidate' });

          return { ok: true, data: json.data };
        } catch (error: any) {
          const message = error?.message || 'Network error';
          return { ok: false, message };
        }
      },
    }),
    { name: 'CandidateAuthStore' }
  )
);
