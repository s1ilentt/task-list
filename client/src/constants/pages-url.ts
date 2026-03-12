class DASHBOARD {
	private root = '/dashboard';

	HOME = this.root;
	TASKS = `${this.root}/tasks`;
	HABITS = `${this.root}/habits`;
	TIMER = `${this.root}/timer`;
	TIME_BLOCKING = `${this.root}/time-blocking`;
	SETTINGS = `${this.root}/settings`;
}

class AUTH {
	private root = '/auth';

	LOGIN = `${this.root}/login`;
	REGISTRATION = `${this.root}/register`;
}

const DASHBOARD_PAGES = new DASHBOARD();
const AUTH_PAGES = new AUTH();

export { DASHBOARD_PAGES, AUTH_PAGES };
