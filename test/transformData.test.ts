import { transformData } from "../src/utils/transformData";

//จัดกลุ่มเทส test case
describe("transformData", () => {
  //Defined test case 1 รายการ ตั้งชื่อให้สอดคล้องกับสิ่งงที่จะเทส ด้านใจจะเป็น callBack fn.
  it("should group user by department and calculate statistics", () => {
    //Mock data for testing
    const users = [
      {
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        age: 25,
        hair: { color: "black" },
        address: { postalCode: 12345 },
        company: { department: "Engineering" },
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        gender: "female",
        age: 22,
        hair: { color: "blonde" },
        address: { postalCode: 54321 },
        company: { department: "Marketing" },
      },
      {
        firstName: "Mike",
        lastName: "Johnson",
        gender: "male",
        age: 30,
        hair: { color: "black" },
        address: { postalCode: 67890 },
        company: { department: "Engineering" },
      },
    ];

    const result = transformData(users);

    //Expected result ว่าจะเป็นอย่างไร
    expect(result).toEqual({
      Engineering: {
        male: 2,
        female: 0,
        ageRange: "25-30",
        hair: {
          black: 2,
        },
        addressUser: {
          JohnDoe: "12345",
          MikeJohnson: "67890",
        },
      },
      Marketing: {
        male: 0,
        female: 1,
        ageRange: "22",
        hair: {
          blonde: 1,
        },
        addressUser: {
          JaneSmith: "54321",
        },
      },
    });
  });
});
