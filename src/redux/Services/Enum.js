import BASE_URL from "./Config";
const COMMON_HEADERS = {
  Accept: "application/json",
  "X-Api-Key": "3ec1b120-a9aa-4f52-9f51-eb4671ee1280",
  AccessToken: "123",
  "Content-Type": "application/json",
};

const getHeaders = () => ({
  ...COMMON_HEADERS,
});

export const fetchCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Enum/Country`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    return []; 
  }
};

export const fetchGrades = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Enum/Grade`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch grades");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching grades:", error.message);
    return [];
  }
};

export const fetchGenders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Enum/Gender`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch genders");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching genders:", error.message);
    return [];
  }
};



export const fetchStudentMode = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Enum/StudentStudyMode`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch genders");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching genders:", error.message);
    return [];
  }
};

export const fetchTeacherMode = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Enum/TeacherTeachingMode`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch genders");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching genders:", error.message);
    return [];
  }
};

export const fetchPreferedWorkScheduled = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Enum/PreferedWorkScheduled`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch genders");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching genders:", error.message);
    return [];
  }
};

export const fetchAvailability = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Enum/Availability`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch genders");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching genders:", error.message);
    return [];
  }
};


export const fetchDashboardContent = async () => {
  try {
    const response = await fetch(`${BASE_URL}/SearchAndList/AdminDashBoard`, {
      method: "POST",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch genders");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching genders:", error.message);
    return [];
  }
};


export const fetchDocumentType  = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Enum/DocumentType`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch genders");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching genders:", error.message);
    return [];
  }
};


export const fetchPreferedCountry  = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Enum/PreferedCountry`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch genders");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching genders:", error.message);
    return [];
  }
};



export const fetchProfileById  = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/Profile/GetContentByUserId?userId=${userId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch genders");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching genders:", error.message);
    return [];
  }
};

