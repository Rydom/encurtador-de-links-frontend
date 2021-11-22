import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { BaseService } from "./base/BaseService";

const ENDPOINT_URL = "/link"
export class LinkService extends BaseService {
  constructor(private axiosInstance: NuxtAxiosInstance) {
    super(axiosInstance, ENDPOINT_URL)
  }

  getDetails() {
    return this.axiosInstance.get(this.prefixUrl + ENDPOINT_URL + '/details')
  }
}
