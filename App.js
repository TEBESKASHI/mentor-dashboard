import React, { Component } from 'react';
import './App.css';
import LoadMentorData from './Mentor-stud.json';
import LoadTaskData from './Stud-Task.json';
let TaskName = ["Code Jam \"CV\"","Code Jam \"CoreJS\"", "Code Jam \"DOM, DOM Events\"", "Markup #1", "RS Activist", "YouTube", "Code Jam \"Scoreboard\"","Game","Presentation"];
const MentorstudentData = JSON.parse(JSON.stringify(LoadMentorData));
const TaskData = JSON.parse(JSON.stringify(LoadTaskData));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '' , tbles : '',coltask : ''};
this.countColRow = this.countColRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.LocaMentor = this.LocaMentor.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  LocaMentor() {
    this.setState({value: localStorage.getItem('Mentor')});
  }
  render() {
    return (
      <div className="App" >
        <header className="App-header">
        <form onSubmit={this.handleSubmit}>
        <label>
         Mentor:    
          <input onClick = {this.LocaMentor} type="text" value={this.state.value} onChange={this.handleChange} autoFocus />
        </label>
        <button type="submit" onClick={() => {this.countColRow(this.state.value)}}>Search...</button>
      </form>
      <div className = "TableTask">
      <table>
        <th style={{ width: 300 }}>Task Names{this.state.coltask}</th>
      {this.state.tbles}
    </table>
    </div>
        </header>
        <div className = "FAQ">
        </div>
      </div>
    );
  }
  countColRow(value){
    for (var key in TaskData) {
      key = key.toLowerCase();
    }
    var tempitem;
      var taskNamed = TaskName.map((item, index) => {
        return <tr key={index}>{item}</tr>;});
        this.setState({coltask:taskNamed});
    if (typeof(MentorstudentData[value]) !== "undefined"){
      localStorage.setItem('Mentor', value);
      var list = MentorstudentData[value].map((item, index) => {
        tempitem = item;
        tempitem = "https://github.com/" + tempitem.toLowerCase();
        if (typeof(TaskData[tempitem]) == "undefined") {
          TaskData[tempitem] = [];
           while (TaskData[tempitem].length < TaskName.length * 2 ) {
            TaskData[tempitem].push(0);
          }
        }
        if (typeof(TaskData[tempitem]) !== "undefined") {
          while (TaskData[tempitem].length < TaskName.length * 2 ) {
            TaskData[tempitem].push(0);
          }
          var SortedList = [];
          var bool = false;
           for (var i = 0; i < TaskName.length;i++){
             for (var a = 0; a < TaskData[tempitem].length;a++){
               if (TaskData[tempitem][a] == TaskName[i]){
                 SortedList.push(TaskData[tempitem][a]);
                 SortedList.push(TaskData[tempitem][a+1]);
                 bool = true;
                 break;
               }
               else bool = false;
             }
             if (bool == false) {
              SortedList.push(0);
              SortedList.push(0);
             }
           }
           TaskData[tempitem] = SortedList;
       var taskInfo = TaskData[tempitem].map((item, index) => {
          if (index%2 !== 0){
            if (TaskData[tempitem][index-1] == TaskName[TaskName.indexOf(TaskData[tempitem][index-1])]){
              if (TaskData[tempitem][index-1] == "RS Activist" || TaskData[tempitem][index-1] == "Game") {
                return <tr style={{ backgroundColor:"#f4f44d" }} key={index}></tr>;
              }
              else if (TaskData[tempitem][index-1] == "YouTube" ||  TaskData[tempitem][index-1] == "Code Jam \"Scoreboard\"" || TaskData[tempitem][index-1] == "Markup #1") {
                return <tr style={{ backgroundColor:"#FF69B4" }} key={index}></tr>;
              }
              else if (TaskData[tempitem][index-1] == "Presentation") {
                return <tr style={{ backgroundColor:"#808080" }} key={index}></tr>;
              }
              return <tr style={{ backgroundColor:"#8CC152" }} key={index}></tr>;}
              else {
                return <tr style={{ backgroundColor:"#E9573F",color:"#000" }} key={index}></tr>;}
              }
            });
        }
      return <th  key={index}><a href ={tempitem}>{item}</a>{taskInfo}</th>;
    });
    this.setState({tbles: list});
    }
    else alert("Такого ментора нету");
  }
}
export default App;
