/**
 * @license
 * Developed by Murilo Parente <muriloparentel@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import {ThController} from "../metadata/th_controller";

@ThController()
export class LogController {

    private service = console;

    private formatMsg(type: 'log'|'info'|'error', ...args: any[]) {
        const m = [
            `${new Date().toLocaleString()} - `,
            `(ThinTS ${type.toUpperCase()}): `,
            ...args
        ];
        return m.map(m => typeof m === "string" ? m : JSON.stringify(m)).join(" ")
    }

    log(...args: any[]) {
        const msg = this.formatMsg('log', ...args);
        this.service.log(msg);
    }

    info(...args: any[]) {
        const msg = this.formatMsg('info', ...args);
        this.service.info(msg);
    }

    error(...args: any[]) {
        const msg = this.formatMsg('error', ...args);
        this.service.error(msg);
    }

}