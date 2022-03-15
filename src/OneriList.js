import React, { Component } from "react";
import "./OneriList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MainAcordion from "./MainAcordion";
import Navbar from "./Navbar.js";
import Sablon from "./Sablon";

class OneriList extends Component {
  render() {
    const { tumHisse, isHisseler, sekerHisseler } = this.props;

    const propHisse = tumHisse.map((hisse, i) => {
      const isHisse = isHisseler.find((isHis) => isHis.Title === hisse);
      const sekerHisse = sekerHisseler.find(
        (sekerHis) => sekerHis[0] === hisse
      );
      return [hisse, isHisse, sekerHisse];
    });

    const tumHisseler = propHisse.map((hisse) => {
      return (
        <CSSTransition key={hisse[0]} timeout={500} classNames="todo">
          <MainAcordion
            key={hisse[0]}
            id={hisse[0]}
            isHisse={hisse[1]}
            sekerHisse={hisse[2]}
            removeTodo={this.remove}
            updateTodo={this.update}
            toggleTodo={this.toggleCompletion}
          />
        </CSSTransition>
      );
    });

    return (
      <Sablon>
        <Navbar />
        <h1>
          Hisse Analizleri!{" "}
          <span>Bankaların isHisselerimiz Üzerindeki Analizleri</span>
        </h1>

        <ul>
          <TransitionGroup className="todo-list">{tumHisseler}</TransitionGroup>
        </ul>
      </Sablon>
    );
  }
}
export default OneriList;

// create = (newTodo) => {
//   this.setState({
//     isHisseler: [...this.state.isHisseler, newTodo],
//   });
// };
// remove = (title) => {
//   this.setState({
//     isHisseler: this.state.isHisseler.filter((t) => t.Title !== title),
//   });
// };
// update = (id, updatedTask) => {
//   const updatedisHisseler = this.state.isHisseler.map((todo) => {
//     if (todo.id === id) {
//       return { ...todo, task: updatedTask };
//     }
//     return todo;
//   });
//   this.setState({ isHisseler: updatedisHisseler });
// };
// toggleCompletion = (id) => {
//   const updatedisHisseler = this.state.isHisseler.map((todo) => {
//     if (todo.id === id) {
//       return { ...todo, completed: !todo.completed };
//     }
//     return todo;
//   });
//   this.setState({ isHisseler: updatedisHisseler });
// };
