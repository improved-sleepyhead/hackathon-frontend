export interface AuthForm {
	email: string,
    code: string,
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