declare module "wolfram-alpha-api" {
  export interface FullQueryObject {
    input: string
  }

  export interface SimpleQueryObject {
    /** Input */
    i: string

    width?: number
    background?: string
    foreground?: string
    fontsize?: number
    units?: "imperial" | "metric"
    timeout: number
    /** Default is `"divider"` */
    layout?: "labelbar" | "divider"
  }

  export interface ShortQueryObject {
    /** Input */
    i: string

    units?: "metric" | "imperial"

    /** Maximum processing time in seconds. Default is `5`. */
    timeout?: number
  }

  export interface SpokenQueryObject {
    /** Input */
    i: string
    units?: "metric" | "imperial"
    timeout?: number
  }

  export type WolframFullQuery = string | FullQueryObject
  export type WolframSimpleQuery = string | SimpleQueryObject
  export type WolframShortQuery = string | ShortQueryObject
  export type WolframSpokenQuery = string | SpokenQueryObject

  /** A Wolfram Alpha API client.
   * https://products.wolframalpha.com/api/libraries/javascript/
   */
  export interface WolframAlphaApi {
    /** This Promise will either resolve with an Object of results, or will reject with an Error.
     *
     * `{ success: true, error: false, numpods: 13, datatypes: '', ...`
     */
    getFull(query: WolframFullQuery): Promise<Object>

    /** This Promise will either resolve with a Data URI, or will reject with an Error.
     *  [Api docs](https://products.wolframalpha.com/simple-api/documentation/).
     *
     * @returns `"data:image/gif;base64,R0lGODlhHAJlA/cAAAAAAAAEAAgICAsNCxwdHBAUECkqKTk8O..."`
     */
    getSimple(query: WolframSimpleQuery): Promise<string>

    /** This Promise will either resolve with a string, or will reject with an Error.
     * [Api docs](https://products.wolframalpha.com/short-answers-api/documentation/).
     *
     * @returns `"Abraham Lincoln (from March 4, 1861 to April 15, 1865)"`
     */
    getShort(query: WolframShortQuery): Promise<string>

    /**
     * This Promise will either resolve with a string, or will reject with an Error.
     * [Api docs](https://products.wolframalpha.com/spoken-results-api/documentation/)
     *
     * @returns `"The answer is Monday, September 7, 2020"`
     */
    getSpoken(query: WolframSpokenQuery): Promise<string>
  }

  /**
   * Creates an API client.
   * https://products.wolframalpha.com/api/libraries/javascript/
   *
   * @param appId The developer app id. Obtain one at the [WolframAlpha Developer portal](http://developer.wolframalpha.com/portal/myapps/index.html)
   */
  export default function create(appId: string): WolframAlphaApi
}
