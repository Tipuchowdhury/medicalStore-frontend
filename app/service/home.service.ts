export const homeService = {
  getCategories: async function () {
    try {
      const res = await fetch(`${process.env.API_URL}/category`);
      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch category" } };
    }
  },

  getMedicines: async function () {
    try {
      const res = await fetch(`${process.env.API_URL}/medicine`);
      if (!res.ok) {
        throw new Error("Failed to fetch medicines");
      }
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Failed to fetch medicines" } };
    }
  },
};
