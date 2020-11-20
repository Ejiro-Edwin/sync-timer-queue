class TimerQueue {
    currentTimer: number | null = null;
    tasks: any[] = [];
    pause: boolean = false;

    addTask = (callback: Function, delay: number) => {
        this.tasks.push({ callback, delay });

        // If there's a scheduled task, bail out.
        if (this.currentTimer) return;

        // Otherwise, start kicking tires
        this.launchNextTask();
    };

    launchNextTask = () => {
        // If there's a scheduled task, bail out.
        if (this.currentTimer) return;

        const self = this;
        const nextTask = this.tasks.shift();

        // There's no more tasks, clean up.
        if (!nextTask) return this.clear();

        // Otherwise, schedule the next task.
        this.currentTimer = setTimeout(() => {
            if (this.pause) {
                this.tasks.push({
                    callback: nextTask.callback,
                    delay: nextTask.delay * 2,
                });
            } else {
                nextTask.callback();
            }

            self.currentTimer = null;

            // Call this function again to set up the next task.
            self.launchNextTask();
        }, nextTask.delay);
    };

    clear = () => {
        if (this.currentTimer) clearTimeout(this.currentTimer);

        // Timer clears only destroy the timer. It doesn't null references.
        this.currentTimer = null;

        // Fast way to clear the task queue
        this.tasks.length = 0;
    };

    setPause = (pause: boolean) => {
        if (this.pause && !pause) {
            this.launchNextTask();
        }
        this.pause = pause;
    };
}

export default TimerQueue;