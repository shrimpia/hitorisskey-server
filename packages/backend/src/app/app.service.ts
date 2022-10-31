import { emojis } from "./emojis.js";

export default class AppService {
  static getReactionEmojis() {
    return emojis;
  }

  static isClosedBeta() {
    return process.env.MODE === 'beta';
  }
}
