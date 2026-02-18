/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */null
export function generateReportCard(student) {
  // Your code here
  if(typeof student != 'object'|| student === null || !student) return null
  if(typeof student.name != "string" || student.name.length==0) return null
  if(typeof student.marks != "object" || student.marks === null) return null
  if(student.marks<0 || student.marks>100) return null

  let totalMarks= Object.values(student.marks).reduce((acc,curr)=>acc+curr,0)
  let totalSubjects=Object.keys(student.marks).length
  let percentage= ((totalMarks/(totalSubjects*100)) *100).toFixed(2)
  console.log("percentage",percentage)
  let passedSubjects=Object.keys(Object.fromEntries(Object.entries(student.marks).filter(([key,value])=>value>=40)))
  console.log("passedSubjects",passedSubjects)
  let failedSubjects=Object.keys(Object.fromEntries(Object.entries(student.marks).filter(([key,value])=>value<40)))
  console.log("failed Subjects",failedSubjects)
  let lowestNumber=Math.min(...Object.values(student.marks))
  
  let lowestSubject=Object.entries(student).find(([key,value])=>(value===lowestNumber))
  let highestNumber=Math.min(...Object.values(student.marks))
  
  let highestSubject=Object.entries(student).find(([key,value])=>(value===lowestNumber))
  let grade=calculateGrade(percentage)
  console.log("grade")
  function calculateGrade(percentage){
    let grade;
    switch (percentage) {
      
      case percentage>=90:
      grade="A+"
      break;
      case percentage>=80:
      grade="A"
      break;
      case percentage>=70:
      grade="B"
      break;
      case percentage>=60:
      grade="C"
      break;
      case percentage>=50:
      grade="D"
      break;
      case percentage<=40:
      grade="F"
      break;  
      default:
        break;
    }
return grade

  }
   let resultObject={
    name:student.name,
    totalMarks,
    percentage,
    grade,
    highestSubject,
    lowestSubject,
    passedSubjects,
    failedSubjects,
    subjectCount:totalSubjects,
  }
  return  resultObject
  
}

console.log(generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, OOP:45, DSA:39, TOA:57 }}))
