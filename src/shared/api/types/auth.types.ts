export interface AuthForm {
	email: string,
    code: string,
};

export interface MailForm {
	email: string,
};

export interface IAuthResponse {
	access_token: string
};

export interface IMailResponse {
	message: string
};