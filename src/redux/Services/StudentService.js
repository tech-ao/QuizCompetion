import BASE_URL from "./Config";

console.log(BASE_URL);

const COMMON_HEADERS = {
  Accept: "text/plain",
  "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
  AccessToken: "123",
  "Content-Type": "application/json",
};

const getHeaders = () => ({
  ...COMMON_HEADERS,
});

console.log(BASE_URL);


export const addStudent = async (studentData) => {
  const response = await fetch(`${BASE_URL}/Student/Create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error("Failed to add student");
  console.log(response);
  return await response.json();
};
