import path from "path"
import fs from "fs"

type PlayerApplicationPaths = {
    launcher: string,
    application: string,
    root: string,
    content: string,
    appdata: string,
}

class RobloxPlayer {
    private readonly platform: NodeJS.Platform
    private readonly registry?

    constructor() {
        this.platform = process.platform

        if (this.platform === "win32") {
            this.registry = require("rage-edit").Registry
        }
    }

    private async __locate_win32(): Promise<PlayerApplicationPaths> {
        const playerLauncher = await this.registry.get("HKCU\\Software\\ROBLOX Corporation\\Environments\\roblox-player", "")
        const { dir: versionPath } = path.parse(playerLauncher)
        const appdata = path.resolve(versionPath, "..", "..")

        return {
            launcher: playerLauncher,
            application: path.join(versionPath, "RobloxPlayerBeta.exe"),
            content: path.join(versionPath, "content"),
            root: versionPath,
            appdata,
        }
    }

    async locate(
        verifyPaths: boolean = true
    ): Promise<PlayerApplicationPaths> {
        let locations: PlayerApplicationPaths

        if (this.platform === "win32") {
            locations = await this.__locate_win32()
        } else {
            throw new Error(`${this.platform} is not yet supported`)
        }

        verifyPaths && Object.values(locations).forEach(value => {
            if (!fs.existsSync(value))
                throw new Error(`${value} does not exist in the filesystem`)
        })

        return locations
    }
}

export default RobloxPlayer
