import path from "path"
import fs from "fs"

type StudioApplicationPaths = {
    launcher: string,
    application: string,
    root: string,
    content: string,
    plugins: string,
    appdata: string,
}

class RobloxStudio {
    private readonly platform: NodeJS.Platform
    private readonly registry?

    constructor() {
        this.platform = process.platform

        if (this.platform === "win32") {
            this.registry = require("rage-edit").Registry
        }
    }

    private async __locate_win32(): Promise<StudioApplicationPaths> {
        const contentFolder = await this.registry.get("HKCU\\Software\\Roblox\\RobloxStudio", "ContentFolder")
        const { dir: versionPath } = path.parse(contentFolder)

        const launcherPath = path.join(versionPath, "RobloxStudioLauncherBeta.exe")
        const appdata = path.resolve(versionPath, "..", "..")

        return {
            launcher: launcherPath,
            application: path.join(versionPath, "RobloxStudioBeta.exe"),
            content: contentFolder,
            root: versionPath,
            plugins: path.join(appdata, "Plugins"),
            appdata,
        }
    }

    async locate(
        verifyPaths: boolean = true
    ): Promise<StudioApplicationPaths> {
        let locations: StudioApplicationPaths

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

export default RobloxStudio
