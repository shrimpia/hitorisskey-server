export const errors = {
  invalidToken: 'INVALID_TOKEN',
  missingToken: 'MISSING_TOKEN',
  missingParams: 'MISSING_PARAMS',
  notFound: 'NOT_FOUND',
  emailDuplicated: 'EMAIL_DUPLICATED',
  noSuchChannel: 'NO_SUCH_CHANNEL',
  contentTooLong: 'CONTENT_TOO_LONG',
  notImplemented: 'NOT_IMPLEMENTED',
  permissionDenied: 'PERMISSION_DENIED',
  banned: 'YOU_ARE_BANNED',
} as const;

export type Error = typeof errors[keyof typeof errors];

export class HitorisskeyError extends Error {
  constructor(public code: Error) {
    super(code);
  }
}