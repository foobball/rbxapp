# rbxapp
> Node.js utility module for locating the install paths of Roblox Studio and Roblox Player.

[![npm](https://img.shields.io/npm/v/rbxapp?color=00a2ff)](https://www.npmjs.com/package/rbxapp)
[![npm](https://img.shields.io/npm/dt/rbxapp)](https://www.npmjs.com/package/rbxapp)
[![dependent repos (via libraries.io)](https://img.shields.io/librariesio/dependent-repos/npm/rbxapp)](https://libraries.io/npm/rbxapp)
[![install size](https://packagephobia.com/badge?p=rbxapp)](https://packagephobia.com/result?p=rbxapp)

# Prerequisites
* [Node.js](https://nodejs.org/en/)
* A package manager ([npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), etc.)
* Windows\*

\* Currently `rbxapp` is only supported on Windows devices, and uses the registry to detect installation paths. Attempting to use locator functions on another platform will throw.

# Install
```
$ npm i rbxapp
```

# Usage
### Finding Studio install path
```js
const { RobloxStudio } = require("rbxapp")
const studio = new RobloxStudio()

(async () => {
    try {
        const paths = await studio.locate()
        console.info(`Roblox Studio is installed at: ${paths.application}`)
    } catch (error) {
        console.error(error)
    }
})()
```

# API
The rbxapp module exports a `RobloxStudio` and a `RobloxPlayer` class, both of which are used to locate their respective applications.

## RobloxStudio Class
### locate(verifyPaths?)
Returns a `Promise`, which resolves with a `StudioApplicationPaths` object.

#### verifyPaths
Type: `boolean`\
Required: No\
Default: `true`

Attempts to verify that all paths are present on the filesystem before returning. Will throw if any of the paths could not be found.

## RobloxPlayer Class
### locate(verifyPaths?)
Returns a `Promise`, which resolves with a `PlayerApplicationPaths` object.

#### verifyPaths
Type: `boolean`\
Required: No\
Default: `true`

Attempts to verify that all paths are present on the filesystem before returning. Will throw if any of the paths could not be found.

## StudioApplicationPaths
Type: `object`

| key | type | description |
|-----|------|-------------|
| launcher | `string` | Path to `RobloxStudioLauncherBeta.exe` |
| application | `string` | Path to `RobloxStudioBeta.exe` |
| root | `string` | Path to `version-{{hash}}` directory (Studio parent directory) |
| content | `string` | Path to Studio's `/content` directory |
| plugins | `string` | Path to the `/Plugins` directory |
| appdata | `string` | Path to the Roblox AppData directory |

## PlayerApplicationPaths
Type: `object`

> The only difference is lack of plugins directory.

| key | type | description |
|-----|------|-------------|
| launcher | `string` | Path to `RobloxPlayerLauncherBeta.exe` |
| application | `string` | Path to `RobloxPlayerBeta.exe` |
| root | `string` | Path to `version-{{hash}}` directory (Player parent directory) |
| content | `string` | Path to Player's `/content` directory |
| appdata | `string` | Path to the Roblox AppData directory |
