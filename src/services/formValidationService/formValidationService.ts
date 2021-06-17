import {
    IFields,
    IIsValidOutput,
} from '@/services/formValidationService/types';
import { DefaultObject } from '@/types';

export class FormValidationService {
    static isEmpty(value: string): boolean {
        return !!value.trim();
    }

    static isNumber(value: string): boolean {
        const regexp = /\d/gi;
        return regexp.test(value);
    }

    static isString(value: string): boolean {
        const regexp = /\D/gi;
        return regexp.test(value);
    }

    static isEmail(value: string): boolean {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // thanks stackoverflow ))
        return regexp.test(value);
    }

    static isPhone(value: string): boolean {
        const regexp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
        return regexp.test(value);
    }

    static isValid<T extends IFields, R extends DefaultObject<any>>(fields: T): IIsValidOutput<R> {
        const entries = Object.entries(fields);
        const filtered = entries.map(([name, { value, validators }]) => ({
            name, value, validators,
        }));

        const result: DefaultObject<string> = {};
        const errors: string[] = [];

        filtered.forEach(({ value, validators, name }) => {
            if (validators?.length) {
                let validCount = 0;

                validators.forEach(validator => {
                    const isValid = validator(value);

                    if (isValid) {
                        validCount++;
                    }
                });

                if (validCount === validators.length) {
                    result[name] = value;
                    return;
                }

                errors.push(name);
            }
        });

        return {
            isValid: !errors.length,
            errors,
            result: result as R,
        };
    }
}
