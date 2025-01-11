A class Task is created for creating the object for each tasks.
This class constructor is being used in the task array list.
A TaskSchedular class is created and can be passed with the concurrency.
TaskSchedulaer class consists of two methods a. addTasks b. run
addTasks methods takes the tasks lists.
run() methods contains the schedular logic
run() method sagregates the dependent tasks and not dependent tasks
Then run() method creates a promise array based on the concurrency nos, and creates the promises in groups and calls them based on concurrency.
