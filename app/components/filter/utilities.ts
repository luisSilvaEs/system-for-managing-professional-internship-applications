import { StudentDynamoDB } from "@/types/student";
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
    .filter( (value, index, self) => self.indexOf(value)===index ).sort(); // Remove duplicates
};
  
  const students: StudentDynamoDB[] = [/* Array of students */];
  
  // Facade class for filtering
export class StudentFilter {
    private students: StudentDynamoDB[];

    constructor(students: StudentDynamoDB[]) {
        this.students = students;
    }

    // Filter by givenName, middleName, lastName, or controlNumber
    filterByNameOrControl(input: string): StudentDynamoDB[] {
        return this.students.filter(student =>
        student.nombre.toLowerCase().includes(input.toLowerCase()) ||
        student.apellidoPaterno.toLowerCase().includes(input.toLowerCase()) ||
        student.apellidoMaterno.toLowerCase().includes(input.toLowerCase()) ||
        student.numeroControl.toLowerCase().includes(input.toLowerCase())
        );
    }

    // Filter by career
    filterByCareer(career: string): StudentDynamoDB[] {
        return this.students.filter(student =>
        student.carreraResidente.toLowerCase() === career.toLowerCase()
        );
    }

    // Filter by internshipPeriod
    filterByInternshipPeriod(period: string): StudentDynamoDB[] {
        return this.students.filter(student =>
        student.periodo.toLowerCase() === period.toLowerCase()
        );
    }

    // Combined filtering
    filterCombined(
        input: string,
        career?: string,
        internshipPeriod?: string
    ): StudentDynamoDB[] {
        let filteredStudents = this.filterByNameOrControl(input);

        if (career) {
        filteredStudents = filteredStudents.filter(student =>
            student.carreraResidente.toLowerCase() === career.toLowerCase()
        );
        }

        if (internshipPeriod) {
        filteredStudents = filteredStudents.filter(student =>
            student.periodo.toLowerCase() === internshipPeriod.toLowerCase()
        );
        }

        return filteredStudents;
    }
}
  