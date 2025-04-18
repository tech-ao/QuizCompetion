import BASE_URL from "./Config";

const COMMON_HEADERS = {
  Accept: "application/json",
  "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
  AccessToken: "123",
  "Content-Type": "application/json",
};

const getHeaders = () => ({ ...COMMON_HEADERS });

export const addStudent = async (studentData) => {
  const response = await fetch(`${BASE_URL}/Student/Create`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error("Failed to add student");
  return await response.json();
};

export const getStudent = async (studentId) => {
  const response = await fetch(`${BASE_URL}/Student/GetUserById?UserId=${studentId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch student data");
  return await response.json();
};
