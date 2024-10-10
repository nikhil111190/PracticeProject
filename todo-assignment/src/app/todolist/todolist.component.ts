import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray = [
    { assigned: 'Self', status: 'Pending', dueDate: '2024-10-15', priority: 'High', comments: 'Initial comment for task 1', description: 'This is a description for task 1.', isCompleted: false },
    { assigned: 'John', status: 'In Progress', dueDate: '2024-10-12', priority: 'Medium', comments: 'Initial comment for task 2', description: 'This is a description for task 2.', isCompleted: false },
    { assigned: 'Alice', status: 'Pending', dueDate: '2024-10-10', priority: 'High', comments: 'Initial comment for task 3', description: 'This is a description for task 3.', isCompleted: false },
    { assigned: 'Mike', status: 'Completed', dueDate: '2024-10-08', priority: 'Low', comments: 'Initial comment for task 4', description: 'This is a description for task 4.', isCompleted: false },
  ];
  
  isAdding: boolean = false; // Initially set to false to hide the add task form
  editIndex: number | null = null;
  editTask: any = null; // Object to hold the task being edited

  constructor() { }

  ngOnInit(): void { }

  openAddTaskWindow() {
    this.isAdding = true; // Show the add task form
    this.editIndex = null; // Reset edit index
    this.editTask = null; // Clear edit task
  }

  closeAddTaskWindow() {
    this.isAdding = false; // Hide the add task form
  }

  onSubmit(form: NgForm) {
    console.log(form);

    if (this.editIndex !== null) {
      // Update existing task
      this.taskArray[this.editIndex] = {
        assigned: form.controls['assigned'].value,
        status: form.controls['status'].value,
        dueDate: form.controls['dueDate'].value,
        priority: form.controls['priority'].value,
        comments: form.controls['comments'].value || 'No comments added', // Default comment if none added
        description: form.controls['description'].value || 'No description added', // Default description if none added
        isCompleted: false
      };
      this.editIndex = null; // Reset edit index
      this.editTask = null; // Clear edit task
    } else {
      // Add new task
      this.taskArray.push({
        assigned: form.controls['assigned'].value,
        status: form.controls['status'].value,
        dueDate: form.controls['dueDate'].value,
        priority: form.controls['priority'].value,
        comments: form.controls['comments'].value || 'No comments added', // Default comment if none added
        description: form.controls['description'].value || 'No description added', // Default description if none added
        isCompleted: false
      });
    }

    form.reset();
    this.isAdding = false; // Reset the adding state
  }

  onDelete(index: number) {
    // Show confirmation dialog
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      console.log(index);
      this.taskArray.splice(index, 1); // Delete the task if confirmed
    }
  }

  onEdit(index: number) {
    console.log(`Edit task at index: ${index}`);
    this.editIndex = index;
    this.editTask = this.taskArray[index]; // Store the task being edited
    this.isAdding = true; // Show the add task form
  }

  onCheck(index: number) {
    console.log(this.taskArray);
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }
}
