import { buildMessage, ValidateBy, ValidationOptions } from "class-validator";
import * as moment from "moment-timezone";

export const IS_FORMAT_DATE = "";
const { DATE_FORMAT = 'YYYY-MM' } = process.env;

export function isFormatDate(durationValue: string, format: string): boolean {
    if (!durationValue) {
        return false;
    }
    return moment(durationValue, format || DATE_FORMAT).isValid();
}

export function IsFormatDate(format: string, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_FORMAT_DATE,
            constraints: [format],
            validator: {
                validate: (value, args): boolean => isFormatDate(value, args?.constraints[0]),
                defaultMessage: buildMessage((eachPrefix, args) => `${eachPrefix}$property must be this format $constraint1 and it must be a real date`, validationOptions),
            },
        },
        validationOptions,
    );
}