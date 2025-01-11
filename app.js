class Task {
    constructor(taskId, duration, deps) {
        this.taskId = taskId;
        this.duration = duration;
        this.deps = deps;
    }
}

class TaskSchedular {
    constructor(concurrency) {
        this.concurrency = concurrency;
    }
    
    addTasks(tasks) {
        this.tasks = tasks;
    }

    run() {
        const tasksWithoutDeps = [];
        const tasksWithDeps = [];
        for (let task of tasks) {
            if(task?.deps?.length && task?.deps?.length == 0) {
                tasksWithoutDeps.push(task);
            } else {
                tasksWithDeps.push(task);
            }
        }

        if(tasksWithoutDeps?.length) {
            const promises = [];
            let concurrencyIteration = this.concurrency -1;
            for (let i =0; i < tasksWithoutDeps.length; i+concurrencyIteration) {
                for(let j = i; j < this.concurrency; j++) {
                    console.log(`${tasksWithoutDeps[j].taskId} started`);
                    promises.push(
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve(`${tasksWithoutDeps[j].taskId} completed`);
                            }, tasksWithoutDeps[j].duration);
                        }).catch(error => reject(error))
                    )
                }
                Promise.allSettled(promises).then((res) => {
                    console.log(res);
                }).catch(err => console.log(err));
            }
        }
    }
}

const tasks = [
    new Task(1, 3, []),
    new Task(2, 2, []),
    new Task(3, 5, [2]),
    new Task(4, 7, [1,3])
]

const scheduler = new TaskSchedular(1);
scheduler.addTasks(tasks);
scheduler.run();