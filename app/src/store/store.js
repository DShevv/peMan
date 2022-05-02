import axios from "axios";
import { makeAutoObservable } from "mobx";
import api, { API_URL } from "../http";
import AuthService from "../services/authService";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  period =
    localStorage.getItem("period") === null
      ? { startDate: Date.now(), length: 30, current: null }
      : JSON.parse(localStorage.getItem("period"));
  selectedPeriod = {};
  spendings = null;
  categodies = null;

  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  setPeriod(period) {
    this.period = period;
  }

  setCurrentPeriod(period) {
    this.selectedPeriod = period;
  }

  setSpendings(spendings) {
    if (typeof spendings !== "string") {
      this.spendings = spendings;
    } else {
      this.spendings = null;
    }
  }

  setCategories(cats) {
    this.categodies = cats;
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accsessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log(response);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  async registration(email, password, name) {
    try {
      const response = await AuthService.registration(email, password, name);
      localStorage.setItem("token", response.data.accsessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log(response);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  async logout() {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accsessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log(response);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async fetchSpendings() {
    try {
      const response = await api.post(`/spendings`, {
        user: this.user,
        date: {
          start: this.selectedPeriod.start,
          end: this.selectedPeriod.end,
        },
      });
      this.setSpendings(response.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
    }
  }
}
