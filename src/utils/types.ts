export type User = {
  id: string;
  socket: string;
  fullName: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
