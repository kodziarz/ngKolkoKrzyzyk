import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  styles = {
    divSize: 50
  }
  fields: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]
  onFieldClicked = (x: string, y: string) => { }

  constructor() {

    // this.fields = [... new Array(3)].map((column, i) => {
    //   return [...new Array(3)].map((e, i) => {
    //     return document.createElement("div") as HTMLDivElement
    //   })
    // })

    // this.board = document.createElement("div")
    // this.board.innerHTML = "xd"
    // //this.board.innerHTML = this.boardHTML
  }

  ngOnInit() {
    console.log("board: ", this.fields);

    // this.board = document.getElementById("board") as HTMLDivElement
    // this.formatBoard(this.board)
    // this.generateBoard()
  }

  generateBoard() {
    // this.fields.forEach((column, x) => {
    //   column.forEach((field, y) => {
    //     this.board.appendChild(field)
    //     //field.style.left = x *
    //   })
    // })
  }

  formatBoard(board: HTMLDivElement) {
    board.style.position = "relative"
  }

  formatFieldDiv(div: HTMLDivElement) {
    div.style.position = "absolute"
    div.style.width = this.styles.divSize + "px"
    div.style.height = this.styles.divSize + "px"
    div.style.border = "1px solid black"
  }
  title = 'kolkoKrzyzyk';
}
