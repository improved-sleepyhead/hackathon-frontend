export interface AuthForm {
	email: string,
    code: number
};

export interface MailForm {
	email: string,
};

export interface IAuthResponse {
	accessToken: string
};

export interface IMailResponse {
	message: string
};