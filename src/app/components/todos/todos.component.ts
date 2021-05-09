import { Component, OnInit } from '@angular/core';
import { Todo } from './../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:Todo[];
  inputTodo:string = "";
  todosDone:Todo[];
  selectedTodo: Todo;

  constructor() { }

  ngOnInit(): void {
    this.selectedTodo = new Todo();
    this.todos = []
    this.todosDone = []
  }

  toggleDone(id:number) {
    this.todos.map((v,i) => {
      if(i == id) {
        v.completed = !v.completed;
        if(!this.todosDone.includes(v)) this.todosDone.push(v);
      }

      return v;
    })
  }

  deleteTodo(id:number) {
    this.todos = this.todos.filter((v,i) => i !== id);
  }

  addTodo() {
    if(this.inputTodo.length > 1){
      this.todos.push({
        content: this.inputTodo,
        completed: false,
        date: new Date()
      });
    }

    this.inputTodo = "";
  }

  editTodo(todo: Todo){
    const div = document.getElementById("edit");
    this.selectedTodo = todo;
    div.classList.toggle("notShow");
  }
  
  orderDate(){
    this.todos.sort( (a,b) => {
      return  a.date.getTime() - b.date.getTime();
    })
  }

  orderAlpha(){
    this.todos.sort( (a,b) => {
      let aContent = a.content.toLowerCase();
      let bContent = b.content.toLowerCase();

      return aContent < bContent ? -1 : aContent > bContent ? 1 : 0;
    })
  }

  orderState(){
    this.todos.sort( a => {
      return a.completed ? 1 : -1;
    });
  }
}
