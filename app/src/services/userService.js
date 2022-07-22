import api from "../http";

export default class UserService {
  static async fetchUsers() {
    return api.get("/users");
  }

  static async fetchCategories(id) {
    return api.post("/categories", { id });
  }

  static async deleteCategory(id) {
    return api.post("/categories/delete", { id });
  }

  static async createCategory(user, name, image) {
    return api.post("/categories/create", { user, name, image });
  }

  static async fetchPictures() {
    return api.get("/pictures");
  }

  static async fetchCurrency() {
    return api.get("/currencies");
  }

  static async createSpendings(
    userId,
    categoryId,
    value,
    currency,
    date,
    isPeriod,
    delta,
    notiDelta
  ) {
    return api.post("/spendings/create", {
      userId,
      categoryId,
      value,
      currency,
      date,
      isPeriod,
      delta,
      notiDelta,
    });
  }

  static async fetchSpendings(user, date) {
    try {
      const response = await api.post(`/spendings`, {
        user,
        date,
      });

      return response.data;
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
    }
  }

  static async nextPeriodSpend(id) {
    try {
      const response = await api.post(`/spendings/period/change`, {
        id,
      });

      return response.data;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
}
