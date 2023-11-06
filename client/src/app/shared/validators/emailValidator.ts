import { FormControl } from '@angular/forms';

export function emailValidator() {
    return (control: FormControl) => {
        const value = control.value;

        if (value) {
            if (!/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
                return {
                    emailValidator: true
                };
            } else {
                return null;
            }
        }

        return null;
    };
}
