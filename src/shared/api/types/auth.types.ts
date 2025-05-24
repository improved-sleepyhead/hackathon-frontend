export interface AuthForm {
	email: string,
    code: number
};

export interface MailForm {
	email: string,
    code: number
};

export interface IAuthResponse {
	accessToken: string
};

export interface IMailResponse {
	message: string
};