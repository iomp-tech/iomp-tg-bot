import cron from 'node-cron';

import TimetableService from './TimetableService.js'

class CronService {
	async startCronTask() {
		// Каждую минуту
		const taskCheckEveryMinute = cron.schedule('0 */1 * * * *', () => {
			TimetableService.checkDateTimetable()
		});

		taskCheckEveryMinute.start();

		return "Start cron task"
	}
}

export default new CronService