export interface JwtPayload {
  sub: number;
  email: string;
  role: "ADMIN" | "USER";
  exp: number;
}
