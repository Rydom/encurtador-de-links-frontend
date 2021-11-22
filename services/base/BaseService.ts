import { NuxtAxiosInstance } from "@nuxtjs/axios";

export class BaseService {
  public readonly prefixUrl = '/api'
  constructor(private axios: NuxtAxiosInstance, private endpoint: string) {  }

  get(id: string) {
    return this.axios.get(this.prefixUrl + this.endpoint + `/${id}`)
  }

  list(extraParams = {}) {
    const params = {
      params: { ...extraParams },
    }
    return this.axios.get(this.prefixUrl + this.endpoint, params)
  }

  save(params: Object) {
    return this.axios.post(this.prefixUrl + this.endpoint, params)
  }

  update(id: string, params: Object) {
    return this.axios.put(this.prefixUrl + this.endpoint + `/${id}`, params)
  }

  delete(id: string) {
    return this.axios.delete(this.prefixUrl + this.endpoint + `/${id}`)
  }
}
