export interface LoginForm {
  remember: boolean
  type: number
}

export interface MobileForm {
  areaCode: string
  mobile: string
  code: string
}

export interface PasswordForm {
  password: string
  passwordAgain: string
}

export interface EmailCodeForm {
  email: string
  code: string
}

export interface LoginAccountForm extends LoginForm {
  username: string
  password: string
}

export interface LoginMobileForm extends LoginForm, MobileForm {}

export interface LoginEmailForm extends LoginForm, EmailCodeForm {}

export interface SignupAccountForm extends MobileForm, PasswordForm {
  username: string
  nickname: string
}

export interface PasswordRetrieveForm extends MobileForm, PasswordForm {}
