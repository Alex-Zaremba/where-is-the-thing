import { ValidatorFn } from '@angular/forms';
import { AbstractFormControl } from '../abstract-form-control';

export class DropDownFormControl extends AbstractFormControl {
    constructor(required: boolean = false, disabled: boolean = false, private collectionDescription: CollectionDescription = {}, private options?: DropDownOptions) {
        super(required, disabled);

        if (options && options.defaultValue) {
            this.setValue(options.defaultValue);
        } else {
            this.setValue(null);
        }

        if (collectionDescription.collection) {
            this.setCollection(collectionDescription.collection);
        }
    }

    override markAsRequred(): void {
        super.markAsRequred();
    }

    override markAsNotRequred(): void {
        super.markAsNotRequred();
    }

    override markRequiredOrNot(isRequired: boolean) {
        if (isRequired) {
            this.markAsRequred();
        } else {
            this.markAsNotRequred();
        }
    }

    setCollection(collection: any[]) {
        this.collectionDescription.collection = collection;

        if (this.collectionDescription.hiddenOptions) {
            const foundOption = this.collectionDescription.collection.find((item: any) => item[this.keyPropertyName] === this.collectionDescription.hiddenOptions[0][this.keyPropertyName]);
            if (foundOption) {
                this.collectionDescription.hiddenOptions = null;
            }
        }

        // if (!this.value && this.collectionDescription.collection?.length) {
        //     this.setValue(this.collectionDescription.collection[0][this.collectionDescription.keyPropertyName]);
        // }
    }

    setHiddenOption(option: any): void {
        if (this.collectionDescription) {
            if (this.collectionDescription.collection) {
                const foundOption = this.collectionDescription.collection.find((item: any) => item[this.keyPropertyName] === option[this.keyPropertyName]);
                if (!foundOption) {
                    this.collectionDescription.hiddenOptions = [option];
                }
            } else {
                this.collectionDescription.hiddenOptions = [option];
            }
        }
    }

    get collection(): any[] {
        return this.collectionDescription.collection;
    }

    get hiddenOptions(): any {
        return this.collectionDescription.hiddenOptions;
    }

    get keyPropertyName(): string {
        return this.collectionDescription.keyPropertyName;
    }

    get valuePropertyName(): string {
        return this.collectionDescription.valuePropertyName;
    }

    get readOnlyCss(): boolean {
        return this.options?.readOnlyCss;
    }

    get matOptionAutoHeight(): boolean {
        return this.options?.matOptionAutoHeight;
    }

    protected getValidators(): ValidatorFn[] {
        return [];
    }
}

export interface CollectionDescription {
    keyPropertyName?: string;
    valuePropertyName?: string;
    collection?: any[];
    hiddenOptions?: any[];
}

export interface DropDownOptions {
    defaultValue?: any;
    readOnlyCss?: boolean;
    matOptionAutoHeight?: boolean;
}
