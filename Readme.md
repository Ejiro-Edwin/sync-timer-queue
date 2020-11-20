# Timer Queue

##### A time-based synchronous queue to add task with pause functionality

#### Installation
```
npm i sync-timer-queue --save
```

#### Usage
```
    import TimerQueue from 'sync-timer-queue';

    const timerQueue = new TimerQueue();

    timerQueue.addTask(() => {
        console.log('My first task')
    }, 500);

    timerQueue.addTask(() => {
        console.log('My Second task')
    }, 500);


    timerQueue.setPause(true);

    timerQueue.setPause(false);

    timerQueue.clear();
```

#### Methods
##### addTask(taskFunction, delayInMillis)
Add task to queue with delay from previous

##### clear()
Clear tasks from queue

##### setPause(boolean)
Pause/Unpause queue


