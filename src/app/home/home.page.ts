import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

interface MyAddress {
  street: string
  streetNr: number
  plz: number
}

interface MyUser {
  username: string,
  email: number;
  address: MyAddress
}

export type TypedFormControls<TControl> = {
  [K in keyof TControl]: FormControl<TControl[K]> | FormGroup<TypedFormControls<TControl[K]>>;
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  useAddress: boolean;
  private data: MyUser;
  private addressFormGroup: FormGroup<TypedFormControls<MyAddress>>;
  formGroup: FormGroup<TypedFormControls<MyUser>>;

  constructor() {}

  ngOnInit(): void {

    const checkUniqueUsername = (control: AbstractControl): Promise<ValidationErrors | null> => {
      // return Promise.resolve({
      //   unique: true
      // })
      return Promise.resolve(null)
    }

    this.data = {
      username: 'Hans',
      email: 2,
      address: {
        plz: 1234,
        street: '',
        streetNr: 1
      }
    }

    this.addressFormGroup = new FormGroup<TypedFormControls<MyAddress>>({
      street: new FormControl(
        '',
        Validators.required
      ),
      streetNr: new FormControl(1) as FormControl<number>,
      plz: new FormControl<number>(0, Validators.required),
    });
    this.addressFormGroup.disable();

    this.formGroup = new FormGroup<TypedFormControls<MyUser>>({
      username: new FormControl(
        this.data.username,
        [Validators.required, Validators.minLength(3)],
        [checkUniqueUsername]
      ),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      address: this.addressFormGroup,
    }, {updateOn: 'change'});

  }

  submitForm() {
    const newData = this.formGroup.value as MyUser;


    console.log(newData)
  }

  toggleAddressFormGroup() {
    if (this.useAddress) {
      this.addressFormGroup.enable()
    } else {
      this.addressFormGroup.disable()
    }
  }
}
