import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) { }

  show(
    message: string = '',
    buttonText: string = 'Ok',
    horizontalPosition: MatSnackBarHorizontalPosition = 'right',
    verticalPosition: MatSnackBarVerticalPosition = 'bottom'
  ) {
    this.matSnackBar.open(message, buttonText, {
      horizontalPosition,
      verticalPosition
    });
  }

}
