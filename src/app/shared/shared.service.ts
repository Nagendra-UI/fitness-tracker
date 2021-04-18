import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class SharedService {
    loading = new Subject<boolean>()
    dataLoading = new Subject<boolean>()
    exercisesLoading = new Subject<boolean>()

    constructor(private _snackBar: MatSnackBar) { }

    showSnackBar(message: string, action: string, duration: number) {
        this._snackBar.open(message, action, { duration: duration })
    }

}