# Angular Typesafe Form Validation

The idea is to link the validate that the `FormControls` respect the types of the mapped entity.
The `formGroup` will return an object with the defined types of the controls.

```typescript
export type TypedFormControls<TControl> = {
  [K in keyof TControl]: FormControl<TControl[K]> | FormGroup<TypedFormControls<TControl[K]>>;
};

```

Example:
```typescript
    this.addressFormGroup = new FormGroup<TypedFormControls<MyAddress>>({
      street: new FormControl(
        '',
        Validators.required
      ),
      streetNr: new FormControl(1) as FormControl<number>,
      plz: new FormControl<number>(0, Validators.required),
    });

```
