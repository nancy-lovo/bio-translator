import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsArrayOfArrays(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'IsArrayOfArrays',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return (
            Array.isArray(value) &&
            value.every((element: any) => element instanceof Array)
          );
        },
        defaultMessage: (validationArguments?: ValidationArguments): string =>
          `${validationArguments.property} must be an array of arrays`,
      },
    });
  };
}
