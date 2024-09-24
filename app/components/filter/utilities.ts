type Student = {
    givenName: string;
    middleName: string;
    lastName: string;
    controlNumber: string;
    career: string;
    address: string;
    internshipPeriod: string;
    internshipCompanyName: string;
  };
/*
T is a generic placeholder that will be replaced with the actual type of the items in the array when the function is called. 
This makes the function flexible and able to work with any array of objects:
- T[]: "An array of things of type T."
- The type T is determined based on the actual data passed to the function.
- <> (angle brackets) are use to define "generics". Allow functions, classes, or interfaces to work with any data type, 
while still enforcing type constraints.
The T inside <> is a placeholder for the actual type that will be provided when the function or class is used. You can think of T as "type variable."
 */
export const getDropdownItems = <T>(property: keyof T, list: T[]):any[] => {
    return list
    .map( item => item[property]  ) // Extract the property values
    .filter( (value, index, self) => self.indexOf(value)===index ); // Remove duplicates
};