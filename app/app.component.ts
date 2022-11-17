import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  FIELD_STATUSES = {
    EMPTY: 0,
    CROSSED: 1,
    CIRCLED: 2
  }

  cssClasses: string[][] = [
    ["field empty", "field empty", "field empty"],
    ["field empty", "field empty", "field empty"],
    ["field empty", "field empty", "field empty"]
  ]

  fields = this.cssClasses.map((column) => {
    return column.map((classes) => {
      switch (true) {
        case classes.includes("circled"):
          return this.FIELD_STATUSES.CIRCLED
        case classes.includes("crossed"):
          return this.FIELD_STATUSES.CROSSED
        default:
          return this.FIELD_STATUSES.EMPTY
      }
    })
  })



  onFieldClicked = (x: number, y: number) => {
    this.crossField(x, y)
    if (this.checkWin()) alert("Gewonnen!")
    this.computerMove()
  }

  constructor() {

  }

  computerMove() {

    let move = this.findMoveForComputer()
    if (move != null) {
      this.circleField(move.x, move.y)
    } else {
      console.log("no move");
      if (this.fields[1][1] == this.FIELD_STATUSES.EMPTY)
        this.circleField(1, 1)
      else if (this.fields[0][0] == this.FIELD_STATUSES.EMPTY)
        this.circleField(0, 0)
      else if (this.fields[0][2] == this.FIELD_STATUSES.EMPTY)
        this.circleField(0, 2)
      else {

        let possible: { x: number, y: number }[] = []
        this.fields.map((column, x) => {
          column.map((status, y) => {
            if (status == this.FIELD_STATUSES.EMPTY) {
              possible.push({ x: x, y: y })
            }
          })
        })
        if (possible.length == 0) alert("Remis")
        else {
          let index = Math.floor(Math.random() * possible.length)

          this.circleField(possible[index].x, possible[index].y)
        }
      }
    }

    if (this.checkWin()) alert("Verloren")
  }

  circleField(x: number, y: number) {
    this.fields[x][y] = this.FIELD_STATUSES.CIRCLED
    this.cssClasses[x][y] = this.cssClasses[x][y].split(/\s?(empty|crossed)\s?/).join(" ")
    this.cssClasses[x][y] += " circled"
  }

  crossField(x: number, y: number) {
    this.fields[x][y] = this.FIELD_STATUSES.CROSSED
    this.cssClasses[x][y] = this.cssClasses[x][y].split(/\s?(empty|circled)\s?/).join(" ")
    this.cssClasses[x][y] += " crossed"
  }

  findMoveForComputer() {
    // determine wheather player can finish game in next move

    let fieldToBlock = null
    //vertically
    for (let x = 0; x < 3; x++) {
      let currentStatus = this.FIELD_STATUSES.CIRCLED
      let number = 0
      let emptyField = null
      for (let y = 0; y < 3; y++) {
        if (this.fields[x][y] != this.FIELD_STATUSES.EMPTY) {
          if (this.fields[x][y] == currentStatus)
            number++
          else {
            currentStatus = this.fields[x][y]
            number = 1
          }
        } else {
          emptyField = { x: x, y: y }
        }
      }
      if (number == 2 && emptyField != null) {
        if (currentStatus == this.FIELD_STATUSES.CIRCLED)
          return emptyField // the value has to be inserted here - either to block player, or to win
        else fieldToBlock = emptyField
      }
    }

    //horizontally
    for (let y = 0; y < 3; y++) {
      let currentStatus = this.FIELD_STATUSES.CIRCLED
      let number = 0
      let emptyField = null
      for (let x = 0; x < 3; x++) {
        if (this.fields[x][y] != this.FIELD_STATUSES.EMPTY) {
          if (this.fields[x][y] == currentStatus)
            number++
          else {
            currentStatus = this.fields[x][y]
            number = 1
          }
        } else {
          emptyField = { x: x, y: y }
        }
      }
      if (number == 2 && emptyField != null) {
        console.log("Zwracam z pionu");
        console.log("emptyField: ", emptyField);
        if (currentStatus == this.FIELD_STATUSES.CIRCLED)
          return emptyField // the value has to be inserted here - either to block player, or to win
        else fieldToBlock = emptyField
      }
    }

    // top-left to bottom-right
    let currentStatus = this.FIELD_STATUSES.CIRCLED
    let number = 0
    let emptyField = null
    for (let a = 0; a < 3; a++) {
      if (this.fields[a][a] != this.FIELD_STATUSES.EMPTY) {
        if (this.fields[a][a] == currentStatus)
          number++
        else {
          currentStatus = this.fields[a][a]
          number = 1
        }
      } else {
        emptyField = { x: a, y: a }
      }
    }
    if (number == 2 && emptyField != null) {
      if (currentStatus == this.FIELD_STATUSES.CIRCLED)
        return emptyField // the value has to be inserted here - either to block player, or to win
      else fieldToBlock = emptyField
    }

    // top-right to bottom-left
    currentStatus = this.FIELD_STATUSES.CIRCLED
    number = 0
    emptyField = null
    for (let a = 0; a < 3; a++) {
      if (this.fields[a][2 - a] != this.FIELD_STATUSES.EMPTY) {
        if (this.fields[a][2 - a] == currentStatus)
          number++
        else {
          currentStatus = this.fields[a][2 - a]
          number = 1
        }
      } else {
        emptyField = { x: a, y: 2 - a }
      }
    }
    if (number == 2 && emptyField != null) {
      if (currentStatus == this.FIELD_STATUSES.CIRCLED)
        return emptyField // the value has to be inserted here - either to block player, or to win
      else fieldToBlock = emptyField
    }

    return fieldToBlock
  }

  checkWin() {

    for (let x = 0; x < 3; x++) {
      let currentStatus = this.FIELD_STATUSES.CIRCLED
      let number = 0
      for (let y = 0; y < 3; y++) {
        if (this.fields[x][y] != this.FIELD_STATUSES.EMPTY) {
          if (this.fields[x][y] == currentStatus)
            number++
          else {
            currentStatus = this.fields[x][y]
            number = 1
          }
        }
      }
      if (number == 3) {
        return true
      }
    }

    //horizontally
    for (let y = 0; y < 3; y++) {
      let currentStatus = this.FIELD_STATUSES.CIRCLED
      let number = 0
      for (let x = 0; x < 3; x++) {
        if (this.fields[x][y] != this.FIELD_STATUSES.EMPTY) {
          if (this.fields[x][y] == currentStatus)
            number++
          else {
            currentStatus = this.fields[x][y]
            number = 1
          }
        }
      }
      if (number == 3) {
        return true
      }
    }

    if (this.fields[0][0] != this.FIELD_STATUSES.EMPTY
      && this.fields[1][1] == this.fields[0][0]
      && this.fields[2][2] == this.fields[0][0])
      return true

    if (this.fields[0][2] != this.FIELD_STATUSES.EMPTY
      && this.fields[1][1] == this.fields[0][0]
      && this.fields[2][0] == this.fields[0][0])
      return true

    return false
  }

  title = 'kolkoKrzyzyk';
}
