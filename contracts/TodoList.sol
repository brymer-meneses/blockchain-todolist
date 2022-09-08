// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {

    struct Task {
        uint id;
        string content;
        bool isCompleted;
    }

    struct User {
        uint totalTasks;
        Task[] tasks;
    }

    event TaskCreated(address user, uint taskId);
    event TaskFinished(address user, uint taskId);


    mapping(address => User) users;

    function createTask(string memory content) public {
        User storage user = users[msg.sender];
        uint taskId = user.totalTasks;

        user.tasks.push( Task(taskId, content, false) ); 

        emit TaskCreated(msg.sender, taskId);
        user.totalTasks++;

    }

    function finishTask(uint taskId) public {
        Task storage task = users[msg.sender].tasks[taskId];

        task.isCompleted = true;
        emit TaskFinished(msg.sender, taskId);
    }

    function retrieveTasks() public view returns( Task[] memory ) {
        return users[msg.sender].tasks;
    }


}

