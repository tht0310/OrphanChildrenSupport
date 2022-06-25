export const options = [
  { name: "Full Name", value: "FullName", dbName: "fullName" },
  { name: "Birthday", value: "DOB", dbName: "dob" },
  { name: "Address", value: "PublicAddress", dbName: "publicAddress" },
  { name: "Gender", value: "Gender", dbName: "gender" },
  { name: "Circumstance", value: "Circumstance", dbName: "circumstance" },
  { name: "Guardian Name", value: "GuardianName", dbName: "guardianName" },
  {
    name: "Guardian Phone Number",
    value: "GuardianPhoneNumber",
    dbName: "guardianPhoneNumber",
  },
];

export function lowercaseFirstLetter(string) {
  return string.charAt(0).toLocaleLowerCase() + string.slice(1);
}
