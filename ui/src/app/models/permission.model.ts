export interface Permission {
  id?: number;
	name?: string;
	description: string;
	module_id?: number;
	has_perm?: boolean;
}