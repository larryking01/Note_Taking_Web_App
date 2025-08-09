import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarResponsiveness {

  constructor() { }

  showSidebar: boolean = true;

  // showCloseSidebarBtn: boolean = false;

  // setShowCloseSidebarBtn() {
  //   this.showCloseSidebarBtn = true
  // }

  // setHideCloseSidebarBtn() {
  //   this.showCloseSidebarBtn = false
  // }

  setShowSidebarTrue() {
    this.showSidebar = true
  }

  setShowSidebarFalse() {
    this.showSidebar = false
  }
}
