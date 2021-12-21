require("dotenv").config()

const expect = require("chai").expect
const { RobloxStudio, RobloxPlayer } = require("../dist")

const path = require("path")

describe("RobloxStudio tests", () => {
    const studio = new RobloxStudio()
    let paths

    it("should find and validate paths", async () => {
        paths = await studio.locate(true)
        expect(paths).to.not.equal(null)
    })

    it("should find RobloxStudioBeta.exe", () => {
        expect(paths.application).to.equal(path.normalize(process.env.CURRENT_STUDIO_PATH))
    })

    it("should find the AppData root directory", () => {
        expect(paths.appdata).to.equal(path.normalize(process.env.CURRENT_APPDATA_PATH))
    })
})

describe("RobloxPlayer tests", () => {
    const player = new RobloxPlayer()
    let paths

    it("should find and validate paths", async () => {
        paths = await player.locate(true)
        expect(paths).to.not.equal(null)
    })

    it("should find RobloxPlayerBeta.exe", () => {
        expect(paths.application).to.equal(path.normalize(process.env.CURRENT_PLAYER_PATH))
    })

    it("should find the AppData root directory", () => {
        expect(paths.appdata).to.equal(path.normalize(process.env.CURRENT_APPDATA_PATH))
    })
})
