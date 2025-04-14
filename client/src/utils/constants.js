export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const UPDATE_LOOKING_FOR_ROUTE = `${AUTH_ROUTES}/update-looking-for`;

export const ROOM_ROUTE = "/api/rooms";

export const CREATE_ROOM_ROUTE = `${ROOM_ROUTE}/create`;
export const GET_ALL_ROOMS_ROUTE = `${ROOM_ROUTE}/`;
