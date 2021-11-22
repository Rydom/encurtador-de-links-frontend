import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { BaseService } from "./base/BaseService";

const ENDPOINT_URL = "/link"
export class LinkService extends BaseService {
  constructor(axiosInstance: NuxtAxiosInstance) {
    super(axiosInstance, ENDPOINT_URL)
  }
}
