import * as axios from 'axios'

declare module 'axios' {
  export interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  }
}