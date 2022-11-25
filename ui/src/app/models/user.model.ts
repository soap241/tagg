export interface User {
  id?: number;
  username?: string;
  fullname?: string;
	password?: string | null;
  can_login?: boolean;
  is_logged_in?: boolean;
  last_activity?: Date;

  accounts?: Array<any>;
}